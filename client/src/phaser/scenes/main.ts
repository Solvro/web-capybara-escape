import type { Room } from "colyseus.js";
import * as Phaser from "phaser";

import { CELL_SIZE, TILE_SIZE, TILE_SIZE_OLD } from "../../constants/global";
import type {
  MessageCratesUpdate,
  MessageDoorsAndButtonsUpdate,
  MessageGenerateLines,
  MessageLasersUpdate,
  MessageMapInfo,
  MessageOnAddPlayer,
  MessageOnRemovePlayer,
  MessagePositionUpdate,
} from "../../types/messages";
import type { INetworkInterface } from "../../types/network-interface";
import type { Player as PlayerType } from "../../types/player";
import { Capybara } from "../entities/capybara";
import { Crate } from "../entities/crate";
import { Player } from "../entities/player";
import { createMap } from "../lib/map-creator";
import {
  PLAYER_TEXTURE_KEYS,
  createPlayerAnimators,
  getPlayerAnimator,
  getPlayerTextureKey,
} from "../lib/player-animators";
import type { SpriteAnimator } from "../lib/sprite-animator";
import { Button } from "../mechanics/button";
import { Cable } from "../mechanics/cable";
import { Door } from "../mechanics/door";
import { Laser } from "../mechanics/laser";
import { Vent } from "../mechanics/vent";
import { SpeechBubble } from "../speech-bubbles/speech-bubble";

export class Main extends Phaser.Scene {
  private room!: Room;
  private capybara: Capybara | null = null;
  private players = new Map<string, Player>();
  private crates = new Map<number, Crate>();
  private buttons = new Map<string, Button>();
  private doors = new Map<string, Door>();
  private lasers = new Map<string, Laser>();
  private cables = new Map<string, Cable>();
  private vents = new Map<number, Vent>();
  private speechBubbles = new Map<string, SpeechBubble>();
  private bubbleTimer!: Phaser.Time.TimerEvent;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private speakInput!: Phaser.Input.Keyboard.Key;
  private playerMoveDebounce = 0;
  private playerAnimators!: SpriteAnimator[];

  constructor() {
    super({ key: "Main" });
  }

  private spawnEntity<
    DataType,
    EntityClass extends Phaser.GameObjects.GameObject &
      INetworkEntity<DataType>,
  >(
    mapCollection: Map<any, EntityClass>,
    EntityConstructor: new (scene: Phaser.Scene, data: DataType) => EntityClass,
    data: DataType,
  ) {
    const entity = new EntityConstructor(this, data);
    this.add.existing(entity);
    mapCollection.set(entity.networkId, entity);
  }

  init() {
    if (!this.registry.has("room")) {
      throw new Error("Room not found in registry");
    }
    this.room = this.registry.get("room") as Room;
  }

  preload() {
    this.load.setBaseURL(import.meta.env.BASE_URL);

    // game objects
    this.load.image("crate", "images/crate.png");
    this.load.spritesheet("tileset", "images/capybara-tileset.png", {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });

    // miscellaneous
    this.load.atlas(
      "speech-bubble-sprite-sheet",
      "images/speech-bubble-sprite-sheet.png",
      "data/speech-bubble-data.json",
    );

    // capybara
    this.load.image("capybara", "images/capybara/back_1.png");

    // player textures
    for (const [index, textureKey] of PLAYER_TEXTURE_KEYS.entries()) {
      this.load.spritesheet(
        textureKey,
        `images/players/${String(index + 1)}.png`,
        {
          frameWidth: TILE_SIZE_OLD,
          frameHeight: TILE_SIZE_OLD,
        },
      );
    }
  }

  create() {
    this.playerAnimators = createPlayerAnimators();
    for (const animator of this.playerAnimators) {
      animator.register(this);
    }

    // Input setup
    if (this.input.keyboard !== null) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys("W,A,S,D") as {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
      };
      this.speakInput = this.input.keyboard.addKey("L");
    }

    // Colyseus message handlers
    try {
      const room = this.registry.get("room") as Room;

      room.onMessage("mapInfo", (message: MessageMapInfo) => {
        createMap(message.grid, message.width, message.height, this);

        for (const player of message.players) {
          this.addPlayer(player);
        }

        for (const crate of message.crates) {
          this.spawnEntity(this.crates, Crate, crate);
        }

        for (const button of message.buttons) {
          this.spawnEntity(this.buttons, Button, button);
        }

        for (const door of message.doors) {
          this.spawnEntity(this.doors, Door, door);
        }

        for (const laser of message.lasers) {
          this.spawnEntity(this.lasers, Laser, laser);
        }

        // add cables from server mapInfo
        for (const cable of message.cables ?? []) {
          if (this.cables.has(cable.cableId)) continue;
          const c = new Cable(
            this,
            cable.x,
            cable.y,
            cable.cableId,
            !!cable.damage,
            cable.timer,
          );
          this.cables.set(cable.cableId, c);
        }

        for (const vent of message.vents) {
          this.spawnEntity(this.vents, Vent, vent);
        }

        this.addCapybara(message.capybara);
      });

      room.onMessage("onAddPlayer", (message: MessageOnAddPlayer) => {
        this.addPlayer({
          sessionId: message.sessionId,
          name: message.playerName,
          x: message.position.x,
          y: message.position.y,
          index: message.index,
          isLocal: message.sessionId === this.room.sessionId,
        });
      });

      room.onMessage("onRemovePlayer", (message: MessageOnRemovePlayer) => {
        const player = this.players.get(message.sessionId);
        if (player !== undefined) {
          player.destroy();
          this.players.delete(message.sessionId);
        }
      });

      room.onMessage("positionUpdate", (message: MessagePositionUpdate) => {
        const player = this.players.get(message.sessionId);
        if (player !== undefined) {
          player.move(message.direction);
        }
      });

      room.onMessage("cratesUpdate", (message: MessageCratesUpdate) => {
        for (const crateUpdate of message.crates) {
          this.crates.get(crateUpdate.crateId)?.syncState(crateUpdate);
        }
      });

      room.onMessage("lasersUpdated", (message: MessageLasersUpdate) => {
        for (const laserUpdate of message.lasers) {
          const laser = this.lasers.get(laserUpdate.laserId);
          if (laser !== undefined) {
            for (const crate of laserUpdate.cratesDestroyed) {
              const crateSprite = this.crates.get(crate.crateId);
              if (crateSprite !== undefined) {
                crateSprite.destroy();
                this.crates.delete(crate.crateId);
              }
            }
            laser.launch(laserUpdate.active, laserUpdate.range);
          }
        }
      });

      room.onMessage(
        "doorsAndButtonsUpdate",
        (message: MessageDoorsAndButtonsUpdate) => {
          for (const element of message.doorsAndButtons) {
            const door = this.doors.get(element.doorId);
            const button = this.buttons.get(element.buttonId);
            door?.syncState({ open: element.open });
            button?.syncState({ pressed: element.open });
          }
        },
      );
      room.onMessage("line", (message: MessageGenerateLines) => {
        const player = this.players.get(message.sessionId);
        if (player !== undefined) {
          this.displayBubble(message.text, player, message.sessionId);
        }
      });

      room.onMessage(
        "capybaraUpdate",
        (message: { x: number; y: number; state: string }) => {
          if (this.capybara) {
            this.capybara.setPosition(
              message.x * CELL_SIZE + CELL_SIZE / 2,
              message.y * CELL_SIZE + CELL_SIZE / 2,
            );
          }
        },
      );

      room.onMessage("line", (message: MessageGenerateLines) => {
        const player = this.players.get(message.sessionId);
        if (player !== undefined) {
          this.displayBubble(message.text, player, message.sessionId);
        }
      });

      this.room.send("getMapInfo");
    } catch (error) {
      console.error("Error setting up Colyseus message handlers:", error);
    }

    // forward Colyseus messages to this scene so mechaniki (np. kable) obsłużą je tak jak inne feature'y [DO ZMIANY PO UJEDNOLICENIU REPOZYTORIUM]
    const room = this.game.registry.get("room");
    if (room) {
      const onMapInfo = (mapInfo: any) => this.events.emit("mapInfo", mapInfo);
      const onCables = (payload: any) => {
        const list = payload?.cables ?? payload?.toggled ?? payload ?? [];
        this.events.emit("cables:update", list);
      };
      const onPlayerDamaged = (p: any) => this.events.emit("player:damaged", p);

      room.onMessage("mapInfo", onMapInfo);
      room.onMessage("cablesUpdate", onCables);
      room.onMessage("playerDamaged", onPlayerDamaged);

      this.sys.events.once("shutdown", () => {
        try {
          room.offMessage("mapInfo", onMapInfo);
          room.offMessage("cablesUpdate", onCables);
          room.offMessage("playerDamaged", onPlayerDamaged);
        } catch (e) {}
      });
    }

    // react to cable toggles forwarded to this scene
    this.events.on("cables:update", (list: any[]) => {
      for (const t of list) {
        const id = t.cableId ?? t.id;
        if (!id) continue;
        const cable = this.cables.get(id);
        if (cable) {
          cable.applyState(
            !!t.damage,
            typeof t.timer === "number" ? t.timer : cable.timer,
          );
        }
      }
    });
  }

  displayBubble(text: string, target: Player, sessionId: string) {
    if (this.speechBubbles.has(sessionId)) {
      this.speechBubbles.get(sessionId)?.destroy();
      this.speechBubbles.delete(sessionId);
      this.bubbleTimer.remove();
    }
    this.speechBubbles.set(
      sessionId,
      new SpeechBubble(this, target, text, sessionId),
    );

    this.bubbleTimer = this.time.delayedCall(
      text.split(" ").length * 600 + 2000,
      () => {
        if (this.speechBubbles.has(sessionId)) {
          this.speechBubbles.get(sessionId)?.destroy();
          this.speechBubbles.delete(sessionId);
        }
      },
    );
  }

  update(time: number) {
    if (Phaser.Input.Keyboard.JustDown(this.speakInput)) {
      this.room.send("generateLine");
    }
    if (time - this.playerMoveDebounce < 250) {
      return;
    }

    this.handleInput(time);
  }

  private addPlayer(playerSpawnInfo: PlayerType) {
    const textureKey = getPlayerTextureKey(playerSpawnInfo.index);
    const animator = getPlayerAnimator(
      this.playerAnimators,
      playerSpawnInfo.index,
    );

    const player = new Player(
      this,
      playerSpawnInfo.x,
      playerSpawnInfo.y,
      playerSpawnInfo.name,
      playerSpawnInfo.sessionId,
      playerSpawnInfo.isLocal,
      textureKey,
      animator,
    );
    this.players.set(playerSpawnInfo.sessionId, player);
    this.add.existing(player);
  }

  private addCapybara(capybaraInfo: { x: number; y: number }) {
    if (this.capybara) {
      this.capybara.destroy();
    }

    this.capybara = new Capybara(this, capybaraInfo.x, capybaraInfo.y);
    this.add.existing(this.capybara);
  }

  handleInput(time: number) {
    let direction = "";

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      direction = "left";
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      direction = "right";
    } else if (this.cursors.up.isDown || this.wasd.W.isDown) {
      direction = "up";
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      direction = "down";
    }

    if (direction !== "") {
      this.room.send("move", { direction });
      this.playerMoveDebounce = time;
    }
  }
}
