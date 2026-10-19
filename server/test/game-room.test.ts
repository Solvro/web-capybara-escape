import { LEVEL_INTRO_COUNTDOWN_MS } from "@capybara/shared";
import { ColyseusTestServer, boot } from "@colyseus/testing";
import assert from "assert";
import { after, before, beforeEach, describe, it } from "mocha";

import appConfig from "../src/app.config";
import { RoomState } from "../src/rooms/schemas/room-state";

function ignoreBroadcasts(client: {
  onMessage(type: "*", callback: () => void): void;
}) {
  client.onMessage("*", () => {});
}

async function readyUpBothPlayers(
  room: any,
  clients: { send: (type: string, message?: unknown) => void }[],
) {
  for (const client of clients) {
    client.send("setReady", { ready: true });
  }
  await room.waitForNextPatch();
}

describe("GameRoom", () => {
  let colyseus: ColyseusTestServer;

  before(async () => {
    colyseus = await boot(appConfig);
  });

  after(async () => {
    await colyseus.shutdown();
  });

  beforeEach(async () => {
    await colyseus.cleanup();
  });

  it("connects a client and syncs room state with a spawned player", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const client = await colyseus.connectTo(room, { name: "TestPlayer" });
    ignoreBroadcasts(client);

    assert.strictEqual(
      client.sessionId,
      room.clients[0].sessionId,
      "Client sessionId matches the first connected client in the room",
    );

    await room.waitForNextPatch();

    const s = room.state;
    assert.ok(s.width > 0);
    assert.ok(s.height > 0);
    assert.strictEqual(s.phase, "lobby", "room starts in the lobby phase");

    const player = s.playerState.players.get(client.sessionId);
    assert.ok(player, "Player exists after join");
    assert.ok(Number.isFinite(player.position.x));
    assert.ok(Number.isFinite(player.position.y));
  });

  it("assigns distinct spawn slots and characters to two players", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const c1 = await colyseus.connectTo(room, {
      name: "Alpha",
      character: "sol",
    });
    ignoreBroadcasts(c1);
    const c2 = await colyseus.connectTo(room, {
      name: "Bravo",
      character: "vron",
    });
    ignoreBroadcasts(c2);

    await room.waitForNextPatch();

    const p1 = room.state.playerState.players.get(c1.sessionId);
    const p2 = room.state.playerState.players.get(c2.sessionId);
    assert.ok(p1 && p2);

    assert.strictEqual(p1.character, "sol");
    assert.strictEqual(p2.character, "vron");

    assert.notDeepStrictEqual(
      { x: p1.position.x, y: p1.position.y },
      { x: p2.position.x, y: p2.position.y },
    );
  });

  it("rejects a second player requesting an already-taken character", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const c1 = await colyseus.connectTo(room, {
      name: "Alpha",
      character: "sol",
    });
    ignoreBroadcasts(c1);

    await assert.rejects(
      colyseus.connectTo(room, { name: "Bravo", character: "sol" }),
      "joining with an already-taken character should be rejected",
    );
  });

  it("stays in the lobby (and ignores move) until both players are ready", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const mover = await colyseus.connectTo(room, {
      name: "Mover",
      character: "sol",
    });
    ignoreBroadcasts(mover);
    const companion = await colyseus.connectTo(room, {
      name: "Companion",
      character: "vron",
    });
    ignoreBroadcasts(companion);
    await room.waitForNextPatch();

    const start = room.state.playerState.players.get(mover.sessionId);
    assert.ok(start);
    const startPos = { x: start.position.x, y: start.position.y };

    mover.send("move", { direction: "down" });
    await room.waitForNextPatch();

    const stillInLobby = room.state.playerState.players.get(mover.sessionId);
    assert.deepStrictEqual(
      { x: stillInLobby.position.x, y: stillInLobby.position.y },
      startPos,
      "move messages are ignored while the room is still in the lobby phase",
    );
    assert.strictEqual(room.state.phase, "lobby");
  });

  it("starts the game once every player has readied up, then allows movement", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const mover = await colyseus.connectTo(room, {
      name: "Mover",
      character: "sol",
    });
    ignoreBroadcasts(mover);
    const companion = await colyseus.connectTo(room, {
      name: "Companion",
      character: "vron",
    });
    ignoreBroadcasts(companion);
    await room.waitForNextPatch();

    await readyUpBothPlayers(room, [mover, companion]);

    assert.strictEqual(room.state.phase, "playing");
    assert.strictEqual(
      room.state.isPaused,
      true,
      "game stays paused until every client finished the level intro",
    );

    mover.send("levelReady");
    companion.send("levelReady");

    await companion.waitForMessage("countdownStart");
    assert.strictEqual(
      room.state.isPaused,
      true,
      "game stays paused during the level intro countdown",
    );

    room.clock.currentTime -= LEVEL_INTRO_COUNTDOWN_MS;
    room.clock.tick();
    await room.waitForNextPatch();
    assert.strictEqual(room.state.isPaused, false);

    const before = room.state.playerState.players.get(mover.sessionId);
    assert.ok(before);
    const start = { x: before.position.x, y: before.position.y };

    for (const direction of ["down", "up", "left", "right"] as const) {
      mover.send("move", { direction });
      await room.waitForNextPatch();

      const after = room.state.playerState.players.get(mover.sessionId);
      assert.ok(after);
      if (after.position.x !== start.x || after.position.y !== start.y) {
        return;
      }
    }

    assert.fail("Player did not move in any cardinal direction from spawn");
  });

  it("frees up a character slot when a player leaves during the lobby phase", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const c1 = await colyseus.connectTo(room, {
      name: "Alpha",
      character: "sol",
    });
    ignoreBroadcasts(c1);
    const staying = await colyseus.connectTo(room, {
      name: "Bravo",
      character: "vron",
    });
    ignoreBroadcasts(staying);
    await room.waitForNextPatch();

    await c1.leave();
    await room.waitForNextPatch();

    assert.strictEqual(
      room.state.playerState.isCharacterTaken("sol"),
      false,
      "character should be free again after leaving the lobby",
    );

    const c2 = await colyseus.connectTo(room, {
      name: "Charlie",
      character: "sol",
    });
    ignoreBroadcasts(c2);
    await room.waitForNextPatch();

    const p2 = room.state.playerState.players.get(c2.sessionId);
    assert.ok(p2);
    assert.strictEqual(p2.character, "sol");
  });

  it("toggles pause after a togglePause message", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const client = await colyseus.connectTo(room, { name: "Pauser" });
    ignoreBroadcasts(client);

    assert.strictEqual(room.state.isPaused, true);

    client.send("togglePause");
    await room.waitForNextPatch();

    assert.strictEqual(room.state.isPaused, false);

    client.send("togglePause");
    await room.waitForNextPatch();

    assert.strictEqual(room.state.isPaused, true);
  });
});
