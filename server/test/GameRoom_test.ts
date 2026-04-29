import type { Room } from "@colyseus/sdk";
import { ColyseusTestServer, boot } from "@colyseus/testing";
import assert from "assert";
import { after, before, beforeEach, describe, it } from "mocha";

import appConfig from "../src/app.config";
import { RoomState } from "../src/rooms/schema/RoomState";

/** Stops colyseus.js "onMessage() not registered" noise when the test client ignores broadcasts. ADD MORE HANDLERS IF NEEDED (Just to avoid warnings for mocha)*/
const GAME_ROOM_BROADCAST_TYPES = [
  "onAddPlayer",
  "onRemovePlayer",
  "capybaraUpdate",
  "lasersUpdated",
  "positionUpdate",
  "cratesUpdate",
  "doorsAndButtonsUpdate",
  "playerDamaged",
  "cablesUpdate",
  "line",
  "roomReset",
  "mapInfo",
  "__playground_message_types",
] as const;

function registerNoopMessageHandlers(clientRoom: Room) {
  for (const type of GAME_ROOM_BROADCAST_TYPES) {
    clientRoom.onMessage(type, () => {});
  }
}

describe("GameRoom (room1)", () => {
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

  it("connects a client and syncs room1 state (size, player spawn)", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const client = await colyseus.connectTo(room, { name: "TestPlayer" });
    registerNoopMessageHandlers(client);

    assert.strictEqual(
      client.sessionId,
      room.clients[0].sessionId,
      "Client sessionId matches the first connected client in the room",
    );

    await room.waitForNextPatch();

    const s = room.state;
    assert.strictEqual(s.width, 10);
    assert.strictEqual(s.height, 8);

    const player = s.playerState.players.get(client.sessionId);
    assert.ok(player, "Player exists after join");
    assert.strictEqual(player.position.x, 1);
    assert.strictEqual(player.position.y, 2);
  });

  it("assigns distinct spawn slots to two players (room1)", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const c1 = await colyseus.connectTo(room, { name: "Alpha" });
    registerNoopMessageHandlers(c1);
    const c2 = await colyseus.connectTo(room, { name: "Bravo" });
    registerNoopMessageHandlers(c2);

    await room.waitForNextPatch();

    const s = room.state;
    const p1 = s.playerState.players.get(c1.sessionId);
    const p2 = s.playerState.players.get(c2.sessionId);
    assert.ok(p1 && p2);

    assert.deepStrictEqual(
      { x: p1.position.x, y: p1.position.y },
      { x: 1, y: 2 },
    );
    assert.deepStrictEqual(
      { x: p2.position.x, y: p2.position.y },
      { x: 6, y: 4 },
    );
  });

  it("moves the player after a move message (down from spawn)", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {});
    const client = await colyseus.connectTo(room, { name: "Mover" });
    registerNoopMessageHandlers(client);
    await room.waitForNextPatch();

    const before = room.state.playerState.players.get(client.sessionId);
    assert.deepStrictEqual(
      { x: before.position.x, y: before.position.y },
      { x: 1, y: 2 },
    );

    client.send("move", { direction: "down" });
    await room.waitForNextPatch();

    const after = room.state.playerState.players.get(client.sessionId);
    assert.deepStrictEqual(
      { x: after.position.x, y: after.position.y },
      { x: 1, y: 3 },
    );
  });
});
