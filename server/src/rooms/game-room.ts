import { ClientMessageType, ServerMessageType } from "@capybara/shared";
import { Client, Room } from "@colyseus/core";
import { CloseCode } from "@colyseus/shared-types";

import fallbackRoom from "@/static/levels/default.json";

import { SpeechBubble } from "../utils/speech-bubble";
import { getMoveVectorFromDirection } from "../utils/vector-utils";
import { getRoomForGame } from "./logic/room-loader";
import { RoomState } from "./schemas/room-state";

export class GameRoom extends Room<{ state: RoomState }> {
  maxClients = 4;
  state = new RoomState();

  private roomData: any = fallbackRoom;

  async onCreate(options: any) {
    this.roomData = await getRoomForGame(options?.levelSlug);
    this.maxClients = this.roomData.maxClients ?? this.maxClients;
    this.state.loadRoomFromJson(this.roomData);
    this.onMessage(ClientMessageType.Move, (client, message) => {
      if (this.state.isPaused) return;

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
      }
      for (const enemy of entityUpdates.enemies) {
        this.broadcast(ServerMessageType.EnemyUpdate, enemy);
      }
    });

    this.onMessage(ClientMessageType.GenerateLine, (client) => {
      this.broadcast(ServerMessageType.Line, {
        sessionId: client.sessionId,
        text: SpeechBubble.getInstance().pickRandomLine("neutral"),
      });
    });

    this.onMessage(ClientMessageType.Reset, (client) => {
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

      this.broadcast(ServerMessageType.RoomReset, {
        message: "Level has been reset",
        mapInfo: this.state.getMapInfo(),
      });
    });

    this.onMessage(ClientMessageType.TogglePause, (client) => {
      this.state.isPaused = !this.state.isPaused;

      this.broadcast(ServerMessageType.PauseToggled, {
        isPaused: this.state.isPaused,
      });
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
}
