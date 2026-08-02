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

    const player = s.playerState.players.get(client.sessionId);
    assert.ok(player, "Player exists after join");
    assert.ok(Number.isFinite(player.position.x));
    assert.ok(Number.isFinite(player.position.y));
  });

  it("assigns distinct spawn slots to two players", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const c1 = await colyseus.connectTo(room, { name: "Alpha" });
    ignoreBroadcasts(c1);
    const c2 = await colyseus.connectTo(room, { name: "Bravo" });
    ignoreBroadcasts(c2);

    await room.waitForNextPatch();

    const p1 = room.state.playerState.players.get(c1.sessionId);
    const p2 = room.state.playerState.players.get(c2.sessionId);
    assert.ok(p1 && p2);

    assert.notDeepStrictEqual(
      { x: p1.position.x, y: p1.position.y },
      { x: p2.position.x, y: p2.position.y },
    );
  });

  it("moves the player after a move message", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const client = await colyseus.connectTo(room, { name: "Mover" });
    ignoreBroadcasts(client);
    await room.waitForNextPatch();

    const before = room.state.playerState.players.get(client.sessionId);
    assert.ok(before);
    const start = { x: before.position.x, y: before.position.y };

    for (const direction of ["down", "up", "left", "right"] as const) {
      client.send("move", { direction });
      await room.waitForNextPatch();

      const after = room.state.playerState.players.get(client.sessionId);
      assert.ok(after);
      if (after.position.x !== start.x || after.position.y !== start.y) {
        return;
      }
    }

    assert.fail("Player did not move in any cardinal direction from spawn");
  });

  it("toggles pause after a togglePause message", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const client = await colyseus.connectTo(room, { name: "Pauser" });
    ignoreBroadcasts(client);

    assert.strictEqual(room.state.isPaused, false);

    client.send("togglePause");
    await room.waitForNextPatch();

    assert.strictEqual(room.state.isPaused, true);

    client.send("togglePause");
    await room.waitForNextPatch();

    assert.strictEqual(room.state.isPaused, false);
  });
});
