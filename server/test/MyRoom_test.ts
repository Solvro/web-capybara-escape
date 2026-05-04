import { ColyseusTestServer, boot } from "@colyseus/testing";
import assert from "assert";

// import your "app.config.ts" file here.
import appConfig from "../src/app.config";
import { RoomState } from "../src/rooms/schema/RoomState";

describe("testing your Colyseus app", () => {
  let colyseus: ColyseusTestServer;

  before(async () => (colyseus = await boot(appConfig)));
  after(async () => colyseus.shutdown());

  beforeEach(async () => await colyseus.cleanup());

  it("creates a room and loads room state", async () => {
    const room = await colyseus.createRoom<RoomState>("game_room", {
      name: "test-player",
    });

    assert.ok(room, "room should be created");
    assert.ok(room.state, "room should have state");
    assert.ok(room.state.playerState, "room should have playerState");
  });
});
