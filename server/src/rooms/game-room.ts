import {
  ClientMessageType,
  MessageMove,
  ServerMessageType,
} from "@capybara/shared";
import { Client, Room } from "@colyseus/core";
import { CloseCode } from "@colyseus/shared-types";

import fallbackRoom from "@/static/levels/default.json";

import { SpeechBubble } from "../utils/speech-bubble";
import { getMoveVectorFromDirection } from "../utils/vector-utils";
import { CollisionHandler } from "./logic/collision-handler";
import { LoadedRoom, getRoomForGame } from "./logic/room-loader";
import { getSequenceLevels } from "./logic/sequence-loader";
import { RoomState } from "./schemas/room-state";

export class GameRoom extends Room<{ state: RoomState }> {
  maxClients = 4;
  state = new RoomState();
  private collisionHandler: CollisionHandler;
  private roomData: any = fallbackRoom;

  private levels: LoadedRoom[] | null = null;
  private currentScreenIndex = 0;
  private awaitingNextScreen = false;
  private awaitingEndDemo = false;

  async onCreate(options: any) {
    this.collisionHandler = new CollisionHandler();

    this.levels = await getSequenceLevels(options?.screenSequenceSlug);
    this.currentScreenIndex = 0;
    this.awaitingNextScreen = false;
    this.awaitingEndDemo = false;

    this.roomData = this.levels
      ? this.levels[0]
      : await getRoomForGame(options?.levelSlug);

    this.maxClients = this.roomData.maxClients ?? this.maxClients;
    this.state.loadRoomFromJson(this.roomData);
    this.onMessage(ClientMessageType.Move, (client, message: MessageMove) => {
      if (this.state.isPaused || this.state.isGameOver) return;

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

        this.broadcast(ServerMessageType.PositionUpdate, {
          sessionId: client.sessionId,
          direction: message.direction,
        });

        const movedCrates = this.state.crateState.getAndClearMovedCrates();

        const positionsToCheck = new Set<string>();
        positionsToCheck.add(`${oldX}_${oldY}`);
        positionsToCheck.add(`${newX}_${newY}`);

        this.broadcast(ServerMessageType.CratesUpdate, { crates: movedCrates });

        const doorsAndButtonsToUpdate = this.state.checkButtonPressed();

        this.broadcast(ServerMessageType.DoorsAndButtonsUpdate, {
          doorsAndButtons: doorsAndButtonsToUpdate,
        });

        if (this.state.cableState.doesDamageOrNotAt(newX, newY)) {
          this.broadcast(ServerMessageType.PlayerDamaged, {
            sessionId: client.sessionId,
            x: newX,
            y: newY,
          });
        }
      }
    });

    this.onMessage(ClientMessageType.GetMapInfo, (client) => {
      // console.log(this.state.getMapInfo());
      client.send(ServerMessageType.MapInfo, this.state.getMapInfo());
    });

    this.setSimulationInterval((deltaTime) => {
      if (this.state.isPaused) return;

      const result = this.state.updateLasers(deltaTime);
      if (result.length > 0) {
        this.broadcast(ServerMessageType.LasersUpdated, { lasers: result });
      }
      this.state.cableState.timerMethod(deltaTime);
      const toggled = this.state.cableState.getAndClearToggledCables?.() ?? [];
      if (toggled.length > 0) {
        this.broadcast(ServerMessageType.CablesUpdate, { cables: toggled });
      }

      const entityUpdates = this.state.updateCapybara(deltaTime);
      if (entityUpdates.capybara) {
        this.broadcast(
          ServerMessageType.CapybaraUpdate,
          entityUpdates.capybara,
        );

        if (entityUpdates.capybara.state === "jump") {
          this.handleLevelComplete();
          return;
        }
      }
      for (const enemy of entityUpdates.enemies) {
        this.broadcast(ServerMessageType.EnemyUpdate, enemy);
      }

      this.checkAllCollisions();
    });

    this.onMessage(ClientMessageType.GenerateLine, (client) => {
      this.broadcast(ServerMessageType.Line, {
        sessionId: client.sessionId,
        text: SpeechBubble.getInstance().pickRandomLine("neutral"),
      });
    });

    this.onMessage(ClientMessageType.Reset, (client) => {
      console.log(`[RESET] Room reset requested by ${client.sessionId}`);
      this.loadLevel(this.roomData);
    });

    this.onMessage(ClientMessageType.NextScreen, (client) => {
      if (!this.levels) {
        console.log(
          `[NEXT_SCREEN] No sequence configured, resetting level (requested by ${client.sessionId})`,
        );
        this.loadLevel(this.roomData);
        return;
      }

      if (!this.awaitingNextScreen) {
        console.log(
          `[NEXT_SCREEN] Ignored from ${client.sessionId} (no pending advance)`,
        );
        return;
      }

      if (this.currentScreenIndex >= this.levels.length - 1) {
        this.awaitingNextScreen = false;
        return;
      }

      this.awaitingNextScreen = false;
      this.currentScreenIndex += 1;
      console.log(
        `[NEXT_SCREEN] Advancing to level ${this.currentScreenIndex + 1}/${
          this.levels.length
        }, requested by ${client.sessionId}`,
      );
      this.loadLevel(this.levels[this.currentScreenIndex]);
    });

    this.onMessage(ClientMessageType.EndDemo, (client) => {
      if (!this.awaitingEndDemo) {
        console.log(
          `[END_DEMO] Ignored from ${client.sessionId} (demo not completed)`,
        );
        return;
      }

      this.awaitingEndDemo = false;
      console.log(`[END_DEMO] Demo end requested by ${client.sessionId}`);

      this.broadcast(ServerMessageType.DemoEnded, {
        message: "Pokoj zostal zamkniety. Dziekujemy za gre!",
      });

      this.clock.setTimeout(() => {
        void this.disconnect();
      }, 300);
    });

    this.onMessage(ClientMessageType.TogglePause, (client) => {
      this.state.isPaused = !this.state.isPaused;

      this.broadcast(ServerMessageType.PauseToggled, {
        isPaused: this.state.isPaused,
      });
    });
  }

  private loadLevel(roomData: LoadedRoom) {
    this.roomData = roomData;
    this.maxClients = this.roomData.maxClients ?? this.maxClients;

    this.awaitingNextScreen = false;
    this.awaitingEndDemo = false;
    this.state.isPaused = false;
    this.state.isGameOver = false;

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

    this.broadcast(ServerMessageType.LasersUpdated, { lasers: [] });
    this.broadcast(ServerMessageType.RoomReset, {
      message: "Level has been reset",
      mapInfo: this.state.getMapInfo(),
    });
  }

  onJoin(client: Client, options: any) {
    this.state.spawnNewPlayer(client.sessionId, options.name);
    const player = this.state.playerState.players.get(client.sessionId);

    this.broadcast(ServerMessageType.OnAddPlayer, {
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

    this.broadcast(ServerMessageType.OnRemovePlayer, {
      sessionId: client.sessionId,
    });
    this.state.despawnPlayer(client.sessionId);
  }

  onDispose() {
    this.state.onRoomDispose();
    console.log("room", this.roomId, "disposing...");
  }

  private handleGameOver() {
    this.state.isGameOver = true;
    this.state.isPaused = true;

    this.broadcast(ServerMessageType.GameOver, {
      message: "Solvroviczu, Koniec Gry",
    });
  }

  private handleLevelComplete() {
    this.state.isGameOver = true;
    this.state.isPaused = true;

    if (this.levels) {
      const isLastScreen = this.currentScreenIndex >= this.levels.length - 1;

      if (isLastScreen) {
        this.awaitingEndDemo = true;
        this.broadcast(ServerMessageType.DemoCompleted, {
          message: "Solvroviczu, Ukonczyles Demo!",
        });
        return;
      }

      this.awaitingNextScreen = true;
      this.broadcast(ServerMessageType.LevelComplete, {
        message: "Solvroviczu, Ukonczyles poziom",
        screenIndex: this.currentScreenIndex,
        totalScreens: this.levels.length,
      });
      return;
    }

    this.broadcast(ServerMessageType.LevelComplete, {
      message: "Solvroviczu, Ukonczyles poziom",
    });
  }

  private checkAllCollisions() {
    if (this.state.isGameOver) return;

    for (const [
      sessionId,
      player,
    ] of this.state.playerState.players.entries()) {
      const hasCollided = this.collisionHandler.checkPlayerCollision(
        { x: player.position.x, y: player.position.y },
        this.state,
      );

      if (hasCollided) {
        this.handleGameOver();
        break;
      }
    }
  }
}
