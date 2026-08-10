import { Client, Room } from "@colyseus/core";
import { CloseCode } from "@colyseus/shared-types";

import { getMoveVectorFromDirection } from "../shared/utils/vectorUtils";
import { SpeechBubble } from "../speech-bubbles/SpeechBubble";
import fallbackRoom from "./json/examples/default.json";
import { getRoomForGame } from "./lib/roomLoader";
import { RoomState } from "./schema/RoomState";

// import room from "./json/examples/room2.json";
// import room from "./json/examples/room3.json";

const TIMER_BROADCAST_INTERVAL_MS = 5000;

export class GameRoom extends Room<{ state: RoomState }> {
  maxClients = 4;
  state = new RoomState();

  private roomData: any = fallbackRoom;

  private timerElapsedMs = 0;
  private timerRunning = true;
  private timerBroadcastAccumulator = 0;

  private get timerUpdatePayload() {
    return {
      elapsedMs: Math.floor(this.timerElapsedMs),
      running: this.timerRunning,
    };
  }

  private broadcastTimer() {
    this.timerBroadcastAccumulator = 0;
    this.broadcast("timerUpdate", this.timerUpdatePayload);
  }

  async onCreate(options: any) {
    this.roomData = await getRoomForGame(options?.levelSlug);
    this.maxClients = this.roomData.maxClients ?? this.maxClients;
    this.state.loadRoomFromJson(this.roomData);
    this.onMessage("move", (client, message) => {
      const player = this.state.playerState.players.get(client.sessionId);
      if (!player) return;

      const oldX = player.position.x;
      const oldY = player.position.y;

      const { dx: deltaX, dy: deltaY } = getMoveVectorFromDirection(
        message.direction,
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

        if (this.state.cableState.doesDamageOrNotAt(newX, newY)) {
          this.broadcast("playerDamaged", {
            sessionId: client.sessionId,
            x: newX,
            y: newY,
          });
        }
      }
    });

    this.onMessage("getMapInfo", (client) => {
      // console.log(this.state.getMapInfo());
      client.send("mapInfo", this.state.getMapInfo());
    });

    this.setSimulationInterval((deltaTime) => {
      if (this.timerRunning) {
        this.timerElapsedMs += deltaTime;
      }
      this.timerBroadcastAccumulator += deltaTime;
      if (this.timerBroadcastAccumulator >= TIMER_BROADCAST_INTERVAL_MS) {
        this.broadcastTimer();
      }

      const result = this.state.updateLasers(deltaTime);
      if (result.length > 0) {
        this.broadcast("lasersUpdated", { lasers: result });
      }
      this.state.cableState.timerMethod(deltaTime);
      const toggled = this.state.cableState.getAndClearToggledCables?.() ?? [];
      if (toggled.length > 0) {
        this.broadcast("cablesUpdate", { cables: toggled });
      }

      this.state.updateCapybara(deltaTime);
      if (this.state.capybara) {
        this.broadcast("capybaraUpdate", {
          x: this.state.capybara.position.x,
          y: this.state.capybara.position.y,
          state: this.state.capybara.state,
        });
      }
    });

    this.onMessage("generateLine", (client) => {
      this.broadcast("line", {
        sessionId: client.sessionId,
        text: SpeechBubble.getInstance().pickRandomLine("neutral"),
      });
    });

    this.onMessage("toggleTimer", (client) => {
      this.timerRunning = !this.timerRunning;
      console.log(
        `[TIMER] ${this.timerRunning ? "Resumed" : "Paused"} by ${client.sessionId}`,
      );
      this.broadcastTimer();
    });

    this.onMessage("reset", (client) => {
      console.log(`[RESET] Room reset requested by ${client.sessionId}`);

      this.timerElapsedMs = 0;
      this.timerRunning = true;
      this.broadcastTimer();

      this.state.loadRoomFromJson(this.roomData);

      this.clients.forEach((c) => {
        const player = this.state.playerState.players.get(c.sessionId);
        if (player) {
          const startPos =
            this.state.startingPositions[
              player.index % this.state.startingPositions.length
            ];
          player.position.x = startPos.x;
          player.position.y = startPos.y;
        }
      });

      this.broadcast("roomReset", {
        message: "Level has been reset",
        mapInfo: this.state.getMapInfo(),
      });
    });
  }

  onJoin(client: Client, options: any) {
    client.send("timerUpdate", this.timerUpdatePayload);

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

  async onLeave(client: Client, code?: number) {
    if (code !== CloseCode.CONSENTED) {
      try {
        // allow disconnected client to reconnect into this room until 20 seconds
        await this.allowReconnection(client, 20);
        return;
      } catch {
        // reconnection failed or timed out — clean up below
      }
    }

    this.broadcast("onRemovePlayer", {
      sessionId: client.sessionId,
    });
    this.state.despawnPlayer(client.sessionId);
  }

  onDispose() {
    this.state.onRoomDispose();
    console.log("room", this.roomId, "disposing...");
  }
}
