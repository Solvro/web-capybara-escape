import { Client, Room } from "@colyseus/core";
import { CloseCode } from "@colyseus/shared-types";
import { isDeepStrictEqual } from "node:util";

import { getMoveVectorFromDirection } from "../shared/utils/vectorUtils";
import { SpeechBubble } from "../speech-bubbles/SpeechBubble";
import fallbackRoom from "./json/examples/default.json";
import { getRoomForGame } from "./lib/roomLoader";
import { RoomState } from "./schema/RoomState";

// import room from "./json/examples/room2.json";
// import room from "./json/examples/room3.json";

export class GameRoom extends Room<{ state: RoomState }> {
  maxClients = 2;
  state = new RoomState();

  private roomData: any = fallbackRoom;
  private readonly isDevelopment = process.env.NODE_ENV === "development";

  async onCreate(options: any) {
    this.roomData = await getRoomForGame(options?.levelSlug);
    this.maxClients = this.roomData.maxClients ?? this.maxClients;
    this.setMetadata({
      isPrivate: !!options.isPrivate,
    });

    if (options.isPrivate) {
      this.setPrivate(true);
    }

    this.onMessage("toggle_ready", (client) => {
      const player = this.state.playerState.players.get(client.sessionId);
      if (player) {
        player.ready = !player.ready;
      }

      if (this.isDevelopment) {
        if (this.clients.length >= 1) {
          const allReady = Array.from(
            this.state.playerState.players.values(),
          ).every((p) => p.ready);
          if (allReady) {
            this.startGame();
            return;
          }
        }
      } else {
        if (this.clients.length >= this.maxClients) {
          const allReady = Array.from(
            this.state.playerState.players.values(),
          ).every((p) => p.ready);
          if (allReady) {
            this.startGame();
            this.lock();
            return;
          }
        }
      }
    });

    this.onMessage("move", (client, message) => {
      if (!this.state.gameStarted || this.state.isPaused) return;

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
      if (!this.state.gameStarted || this.state.isPaused) return;

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

    this.onMessage("reset", (client) => {
      console.log(`[RESET] Room reset requested by ${client.sessionId}`);

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

    this.onMessage("togglePause", (client) => {
      this.state.isPaused = !this.state.isPaused;

      this.broadcast("pauseToggled", {
        isPaused: this.state.isPaused,
      });
    });

    if (this.isDevelopment) {
      this.autoDispose = false;
    }
  }

  private startGame() {
    if (this.state.gameStarted) return;
    this.state.gameStarted = true;
    this.state.loadRoomFromJson(this.roomData);

    this.clients.forEach((client) => {
      const p = this.state.playerState.players.get(client.sessionId);
      if (p) {
        const startPos =
          this.state.startingPositions[
            p.index % this.state.startingPositions.length
          ];
        if (startPos) {
          p.position.x = startPos.x;
          p.position.y = startPos.y;
        }
      }
    });
  }

  onAuth(client: Client, options: any, request: any) {
    if (!this.isDevelopment) {
      if (this.state.gameStarted) {
        throw new Error("Game already started. You cannot join.");
      }
    }
    return true;
  }

  onJoin(client: Client, options: any) {
    const nickname = options.name;

    if (this.state.gameStarted) {
      if (this.state.playerState.players.has(client.sessionId)) {
        console.log(`Player ${nickname} succesfully reconnected.`);
        return;
      }

      // W trybie dev
      console.log(
        `Game in progress. Spawning player ${nickname} at an available starting position.`,
      );
      this.state.spawnNewPlayer(client.sessionId, nickname);

      const player = this.state.playerState.players.get(client.sessionId);
      if (player) {
        const startPos =
          this.state.startingPositions[
            player.index % this.state.startingPositions.length
          ];
        if (startPos) {
          player.position.x = startPos.x;
          player.position.y = startPos.y;
        }
      }

      this.broadcast("onAddPlayer", {
        sessionId: client.sessionId,
        playerName: player.name,
        position: {
          x: player.position.x,
          y: player.position.y,
        },
        index: player.index,
      });

      return;
    }
    this.state.spawnNewPlayer(client.sessionId, nickname);
    const player = this.state.playerState.players.get(client.sessionId);
    console.log(
      `Player ${player.name} joined as ${player.index === 0 ? "Sol" : "Vron"}`,
    );
  }

  async onLeave(client: Client, code: number) {
    if (this.isDevelopment) {
      console.log("Development build: Room stays open.");
      try {
        await this.allowReconnection(client, 10);
        console.log(`Player ${client.sessionId} reconnected in DEV mode.`);
      } catch (e) {
        console.log("Player did not return. Cleaning up player from dev room.");
        this.broadcast("onRemovePlayer", { sessionId: client.sessionId });
        this.state.despawnPlayer(client.sessionId);
      }
    } else {
      try {
        if (code == CloseCode.CONSENTED) {
          throw new Error("Player left on purpose.");
        }

        await this.allowReconnection(client, 20);
        console.log(`Player ${client.sessionId} reconnected.`);
      } catch (e) {
        console.log("Player did not return. Game closed.");

        this.broadcast(
          "error",
          "One of the players left the game. Room closed.",
        );
        this.disconnect(); // Close room and disconnect rest of players
      }
    }
  }

  onDispose() {
    this.state.onRoomDispose();
    console.log("room", this.roomId, "disposing...");
  }
}
