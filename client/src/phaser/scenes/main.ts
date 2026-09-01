import type {
  MessageCablesUpdate,
  MessageCratesUpdate,
  MessageDoorsAndButtonsUpdate,
  MessageEnemyUpdate,
  MessageGenerateLines,
  MessageLasersUpdate,
  MessageMapInfo,
  MessageOnAddPlayer,
  MessageOnRemovePlayer,
  MessagePauseToggled,
  MessagePositionUpdate,
  Player as PlayerType,
} from "@capybara/shared";
import type { Room } from "@colyseus/sdk";
import * as Phaser from "phaser";

import { SOL_ANIM_CONFIG } from "@/constants/animators/sol-animator-config";
import { VRON_ANIM_CONFIG } from "@/constants/animators/vron-animator-config";
import { NameTag } from "@/phaser/ui/name-tag";
import { SpeechBubble } from "@/phaser/ui/speech-bubble";
import { Display } from "@/utils/display";

import { CELL_SIZE, LAYER_NAMES, TILE_SIZE } from "../../constants/global";
import type { LAYER_NAME } from "../../constants/global";
import type { INetworkInterface } from "../../types/network-interface";
import { CapybaraEntityAnimator } from "../animators/capybara-entity-animator";
import { EnemyEntityAnimator } from "../animators/enemy-entity-animator";
import { StateController } from "../animators/entity-animator";
import { PlayerEntityAnimator } from "../animators/player-entity-animator";
import { Capybara } from "../entities/capybara";
import { Crate } from "../entities/crate";
import { Enemy } from "../entities/enemy";
import { Player } from "../entities/player";
import { Button } from "../mechanics/button";
import { Cable } from "../mechanics/cable";
import { Door } from "../mechanics/door";
import { Laser } from "../mechanics/laser";
import { Vent } from "../mechanics/vent";
import { Wire } from "../mechanics/wire";

export class Main extends Phaser.Scene {
  private room!: Room;
  displayHandler!: Display;
  private capybara: Capybara | null = null;
  private enemies = new Map<number, Enemy>();
  private players = new Map<string, Player>();
  private crates = new Map<number, Crate>();

  private buttons = new Map<string, Button>();
  private doors = new Map<string, Door>();
  private lasers = new Map<string, Laser>();
  private cables = new Map<string, Cable>();
  private wires = new Map<string, Wire>();
  private vents = new Map<number, Vent>();
  private speechBubbles = new Map<string, SpeechBubble>();
  private nameTags = new Map<string, NameTag>();
  private bubbleTimer!: Phaser.Time.TimerEvent;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private speakInput!: Phaser.Input.Keyboard.Key;
  private resetInput!: Phaser.Input.Keyboard.Key;
  private pauseInput!: Phaser.Input.Keyboard.Key;
  private playerMoveDebounce = 0;
  private playerEntityAnimators!: PlayerEntityAnimator[];
  private isPaused = false;
  private capybaraAnimator!: CapybaraEntityAnimator;
  private enemyAnimatorTemplate!: EnemyEntityAnimator;

  constructor() {
    super({ key: "Main" });
  }

  private spawnEntity<
    DataType,
    EntityClass extends Phaser.GameObjects.GameObject &
      INetworkInterface<DataType>,
  >(
    mapCollection: Map<any, EntityClass>,
    EntityConstructor: new (scene: Phaser.Scene, data: DataType) => EntityClass,
    data: DataType,
    layer: LAYER_NAME,
  ) {
    const entity = new EntityConstructor(this, data);
    this.displayHandler.add(layer, entity);
    mapCollection.set(entity.networkId, entity);
  }

  init() {
    if (!this.registry.has("room")) {
      throw new Error("Room not found in registry");
    }
    this.room = this.registry.get("room") as Room;
    this.displayHandler = new Display(this);
  }

  preload() {
    this.load.setBaseURL(import.meta.env.BASE_URL);

    // game objects
    this.load.spritesheet("tileset", "textures/map-tileset.png", {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });

    // miscellaneous
    this.load.atlas(
      "speech-bubble-sprite-sheet",
      "textures/speech-bubble-sprite-sheet.png",
      "data/speech-bubble-data.json",
    );

    // capybara
    this.capybaraAnimator = new CapybaraEntityAnimator(
      "textures/capybara/capybara-tileset.png",
      new StateController(),
    );
    this.capybaraAnimator.preload(this);

    this.enemyAnimatorTemplate = new EnemyEntityAnimator(
      "textures/enemy/evil-drone-tileset.png",
      new StateController(),
    );
    this.enemyAnimatorTemplate.preload(this);

    // player textures
    const playerSetups = [
      {
        key: "player1",
        path: "textures/sol/sol-tileset.png",
        config: SOL_ANIM_CONFIG,
      },
      {
        key: "player2",
        path: "textures/vron/vron-tileset.png",
        config: VRON_ANIM_CONFIG,
      },
      {
        key: "player3",
        path: "textures/sol/sol-tileset.png",
        config: SOL_ANIM_CONFIG,
      },
      {
        key: "player4",
        path: "textures/vron/vron-tileset.png",
        config: VRON_ANIM_CONFIG,
      },
    ] as const;

    this.playerEntityAnimators = playerSetups.map(({ key, path, config }) => {
      const animator = new PlayerEntityAnimator(
        key,
        path,
        config,
        new StateController(),
      );
      animator.preload(this);
      return animator;
    });
  }

  create() {
    for (const animator of this.playerEntityAnimators) {
      animator.register(this);
    }
    this.capybaraAnimator.register(this);
    this.enemyAnimatorTemplate.register(this);

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
      this.resetInput = this.input.keyboard.addKey("R");
      this.pauseInput = this.input.keyboard.addKey("P");
    }

    // Colyseus message handlers
    try {
      const room = this.registry.get("room") as Room;

      room.onMessage("mapInfo", (message: MessageMapInfo) => {
        this.syncPauseState(message.isPaused);

        // Resize the canvas to the full map so the whole map is rendered.
        // The on-screen size is then multiplied by the zoom (MAP_SCALER).
        this.scale.resize(
          message.width * CELL_SIZE,
          message.height * CELL_SIZE,
        );

        this.displayHandler.createMap(
          message.grid,
          message.width,
          message.height,
        );

        for (const player of message.players) {
          this.addPlayer(player);
        }

        for (const crate of message.crates) {
          this.spawnEntity(this.crates, Crate, crate, LAYER_NAMES.ENTITIES);
        }
        for (const button of message.buttons) {
          this.spawnEntity(
            this.buttons,
            Button,
            button,
            LAYER_NAMES.FLOOR_DECOYS,
          );
        }

        for (const door of message.doors) {
          this.spawnEntity(this.doors, Door, door, LAYER_NAMES.BACKGROUND);
        }

        for (const laser of message.lasers) {
          this.spawnEntity(this.lasers, Laser, laser, LAYER_NAMES.ENTITIES);
        }
        for (const cable of message.cables) {
          this.spawnEntity(this.cables, Cable, cable, LAYER_NAMES.FLOOR_DECOYS);
        }
        for (const wire of message.wires) {
          this.spawnEntity(this.wires, Wire, wire, LAYER_NAMES.FLOOR_DECOYS);
        }
        for (const vent of message.vents) {
          this.spawnEntity(this.vents, Vent, vent, LAYER_NAMES.FLOOR_DECOYS);
        }

        this.addCapybara(message.capybara);

        for (const enemy of message.enemies) {
          this.addEnemy(enemy);
        }
      });

      room.onMessage("onAddPlayer", (message: MessageOnAddPlayer) => {
        this.addPlayer({
          sessionId: message.sessionId,
          name: message.playerName,
          x: message.position.x,
          y: message.position.y,
          index: message.index,
        });
      });

      room.onMessage("onRemovePlayer", (message: MessageOnRemovePlayer) => {
        this.removePlayer(message.sessionId);
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
            if (element.doorId !== undefined && element.open !== undefined) {
              this.doors.get(element.doorId)?.syncState({ open: element.open });
            }
            if (
              element.buttonId !== undefined &&
              element.pressed !== undefined
            ) {
              this.buttons
                .get(element.buttonId)
                ?.syncState({ pressed: element.pressed });
            }
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
          this.capybara?.syncServerState(message);
        },
      );

      room.onMessage("enemyUpdate", (message: MessageEnemyUpdate) => {
        this.enemies.get(message.id)?.syncState(message);
      });

      room.onMessage("line", (message: MessageGenerateLines) => {
        const player = this.players.get(message.sessionId);
        if (player !== undefined) {
          this.displayBubble(message.text, player, message.sessionId);
        }
      });

      room.onMessage("roomReset", () => {
        this.resetGraphics();

        this.room.send("getMapInfo");
      });

      room.onMessage("cablesUpdate", (cables: MessageCablesUpdate) => {
        for (const cableUpdate of cables.cables) {
          const cable = this.cables.get(cableUpdate.cableId);
          if (cable !== undefined) {
            cable.syncState(cableUpdate);
          }
        }
      });

      room.onMessage("pauseToggled", (message: MessagePauseToggled) => {
        this.syncPauseState(message.isPaused);
      });

      this.room.send("getMapInfo");
    } catch (error) {
      console.error("Error setting up Colyseus message handlers:", error);
    }
  }

  private syncPauseState(isPaused: boolean) {
    this.isPaused = isPaused;
    window.dispatchEvent(
      new CustomEvent("game:pauseToggled", {
        detail: { isPaused: this.isPaused },
      }),
    );
  }

  displayBubble(text: string, target: Player, sessionId: string) {
    if (this.speechBubbles.has(sessionId)) {
      this.speechBubbles.get(sessionId)?.destroy();
      this.speechBubbles.delete(sessionId);
      this.bubbleTimer.remove();
    }
    const bubble = new SpeechBubble(this, target, text, sessionId);
    this.speechBubbles.set(sessionId, bubble);
    this.displayHandler.add("effects", bubble, true);

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
    if (Phaser.Input.Keyboard.JustDown(this.pauseInput)) {
      this.room.send("togglePause");
    }

    if (Phaser.Input.Keyboard.JustDown(this.resetInput)) {
      this.room.send("reset");
    }

    if (this.isPaused) {
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.speakInput)) {
      this.room.send("generateLine");
    }

    for (const player of this.players.values()) {
      player.animate();
    }
    this.capybara?.animate();
    for (const enemy of this.enemies.values()) {
      enemy.animate();
    }

    if (time - this.playerMoveDebounce < 250) {
      return;
    }

    this.handleInput(time);
  }

  private addPlayer(playerSpawnInfo: PlayerType) {
    const isLocal = playerSpawnInfo.sessionId === this.room.sessionId;
    const index = Math.max(
      0,
      Math.min(playerSpawnInfo.index, this.playerEntityAnimators.length - 1),
    );
    const animator = this.playerEntityAnimators[index];

    const player = new Player(
      this,
      playerSpawnInfo.x,
      playerSpawnInfo.y,
      playerSpawnInfo.name,
      playerSpawnInfo.sessionId,
      isLocal,
      animator.textureKey,
      animator,
    );
    this.players.set(playerSpawnInfo.sessionId, player);
    this.displayHandler.add(LAYER_NAMES.ENTITIES, player);

    const nameTag = new NameTag(this, player, playerSpawnInfo.name);
    this.nameTags.set(playerSpawnInfo.sessionId, nameTag);
    this.displayHandler.add(LAYER_NAMES.EFFECTS, nameTag, true);
  }

  private removePlayer(sessionId: string) {
    this.players.get(sessionId)?.destroy();
    this.players.delete(sessionId);
    this.nameTags.get(sessionId)?.destroy();
    this.nameTags.delete(sessionId);
  }

  private addCapybara(capybaraInfo: { x: number; y: number }) {
    if (this.capybara !== null) {
      this.capybara.destroy();
    }

    if (!capybaraInfo) {
      return;
    }

    this.capybara = new Capybara(
      this,
      capybaraInfo.x,
      capybaraInfo.y,
      this.capybaraAnimator,
    );
    this.displayHandler.add("entities", this.capybara);
  }

  private addEnemy(enemyInfo: { id: number; x: number; y: number }) {
    const existing = this.enemies.get(enemyInfo.id);
    if (existing !== undefined) {
      existing.destroy();
    }

    const animator = new EnemyEntityAnimator(
      "textures/enemy/evil-drone-tileset.png",
      new StateController(),
    );

    const enemy = new Enemy(
      this,
      enemyInfo.x,
      enemyInfo.y,
      enemyInfo.id,
      animator,
    );
    this.enemies.set(enemyInfo.id, enemy);
    this.displayHandler.add(LAYER_NAMES.ENTITIES, enemy);
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

  private resetGraphics() {
    this.capybara?.destroy();
    this.capybara = null;

    const mapsToDestroy = [
      this.cables,
      this.players,
      this.nameTags,
      this.speechBubbles,
      this.crates,
      this.doors,
      this.buttons,
      this.enemies,
      this.lasers,
      this.vents,
      this.wires,
    ];

    for (const object of mapsToDestroy) {
      if (!object) continue;

      for (const entity of object.values()) {
        entity.destroy();
      }
      object.clear();
    }

    this.displayHandler.clear();
  }
}
