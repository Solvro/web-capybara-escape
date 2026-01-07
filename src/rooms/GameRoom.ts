import { Room, Client } from "@colyseus/core";
import { getMoveVectorFromDirection } from "../shared/utils/vectorUtils";
import { RoomState } from "./schema/RoomState";
import room from "./json/examples/room1.json";
// import room from "./json/examples/room2.json";
// import room from "./json/examples/room3.json";

export class GameRoom extends Room<RoomState> {
  maxClients = 4;
  state = new RoomState();

  onCreate(options: any) {
    this.maxClients = room.maxClients ?? this.maxClients;
    this.state.loadRoomFromJson(room);
    this.onMessage("move", (client, message) => {
      const player = this.state.playerState.players.get(client.sessionId);
      if (!player) return;

      const oldX = player.position.x;
      const oldY = player.position.y;

      const { dx: deltaX, dy: deltaY } = getMoveVectorFromDirection(
        message.direction
      );

      if (this.state.movePlayer(client.sessionId, deltaX, deltaY)) {
        const newX = player.position.x;
        const newY = player.position.y;

        this.broadcast("positionUpdate", {
          sessionId: client.sessionId,
          direction: message.direction,
        });

        const movedCrates = this.state.crateState.getAndClearMovedCrates();

        const positionsToCheck = new Set<string>();
        positionsToCheck.add(`${oldX}_${oldY}`);
        positionsToCheck.add(`${newX}_${newY}`);

        this.broadcast("cratesUpdate", { crates: movedCrates });

        const doorsAndButtonsToUpdate = this.state.checkButtonPressed();

        this.broadcast("doorsAndButtonsUpdate", {
          doorsAndButtons: doorsAndButtonsToUpdate,
        });
      }
    });

    this.onMessage("getMapInfo", (client) => {
      console.log(this.state.getMapInfo());
      client.send("mapInfo", this.state.getMapInfo());
    });

    this.onMessage("fireLaser", (client, message) => {
      const result = this.state.fireLaser(message.laserId);
      this.broadcast("laserFired", {
        laserId: message.laserId,
        active: result.active,
        path: result.path,
        cratesDestroyed: result.cratesDestroyed,
      });
    });
  }

  onJoin(client: Client, options: any) {
    this.state.spawnNewPlayer(client.sessionId, options.name);
    const player = this.state.playerState.players.get(client.sessionId);

    this.broadcast("onAddPlayer", {
      sessionId: client.sessionId,
      playerName: player.name,
      position: player.position,
      index: player.index,
    });
    console.log(client.sessionId, "joined!");
  }

  async onLeave(client: Client, consented: boolean) {
    try {
      if (consented) {
        throw new Error("consented leave");
      }

      // allow disconnected client to reconnect into this room until 20 seconds
      await this.allowReconnection(client, 0);
    } catch (e) {
      this.broadcast("onRemovePlayer", {
        sessionId: client.sessionId,
      });
      this.state.despawnPlayer(client.sessionId);
    }
  }

  onDispose() {
    this.state.onRoomDispose();
    console.log("room", this.roomId, "disposing...");
  }
}
