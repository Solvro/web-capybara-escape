import type { Room } from "colyseus.js";
import * as Phaser from "phaser";

import type { Button as ButtonType } from "../../types/button";
import type { Crate as CrateType } from "../../types/crate";
import type { Door as DoorType } from "../../types/door";
import type { Laser as LaserType } from "../../types/laser";
import type {
  MessageCratesUpdate,
  MessageDoorsAndButtonsUpdate,
  MessageLasersUpdate,
  MessageMapInfo,
  MessageOnAddPlayer,
  MessageOnRemovePlayer,
  MessagePositionUpdate,
} from "../../types/messages";
import type { Player as PlayerType } from "../../types/player";
import { Crate } from "../entities/crate";
import { Player } from "../entities/player";
import { TILE_SIZE } from "../lib/const";
import {
  PLAYER_TEXTURE_KEYS,
  createPlayerAnimators,
  getPlayerAnimator,
  getPlayerTextureKey,
} from "../lib/player-animators";
import type { SpriteAnimator } from "../lib/sprite-animator";
import { Button } from "../mechanics/button";
import { Door } from "../mechanics/door";
import { Laser } from "../mechanics/laser";

export class Main extends Phaser.Scene {
  private room!: Room;
  private players = new Map<string, Player>();
  private crates = new Map<number, Crate>();
  private buttons = new Map<string, Button>();
  private doors = new Map<string, Door>();
  private lasers = new Map<string, Laser>();
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private playerMoveDebounce = 0;
  private playerAnimators!: SpriteAnimator[];

  constructor() {
    super({ key: "Main" });
  }

  init() {
    if (!this.registry.has("room")) {
      throw new Error("Room not found in registry");
    }
    this.room = this.registry.get("room") as Room;
  }

  preload() {
    this.load.setBaseURL(import.meta.env.BASE_URL);

    // walls
    this.load.image("w1", "images/walls/w1.png");

    // floors
    this.load.image("f1", "images/floors/f1.png");

    this.load.image("crate", "images/crate.png");
    this.load.image("button-released", "images/buttons/button-green.png");
    this.load.image("button-pressed", "images/buttons/button-red.png");
    this.load.image("door-open", "images/doors/door-green-open.png");
    this.load.image("door-closed", "images/doors/door-green-closed.png");
    this.load.image("laser-gun", "images/lasers/laser-gun.png");
    this.load.image("laser-line", "images/lasers/laser-horizontal-line.png");

    for (const [index, textureKey] of PLAYER_TEXTURE_KEYS.entries()) {
      this.load.spritesheet(
        textureKey,
        `images/players/${String(index + 1)}.png`,
        {
          frameWidth: 64,
          frameHeight: 64,
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
    }

    // Colyseus message handlers
    try {
      const room = this.registry.get("room") as Room;

      room.onMessage("mapInfo", (message: MessageMapInfo) => {
        this.createMap(message.grid, message.width, message.height);

        for (const player of message.players) {
          this.addPlayer(player);
        }

        for (const crate of message.crates) {
          this.addCrate(crate);
        }

        for (const button of message.buttons) {
          this.addButton(button);
        }

        for (const door of message.doors) {
          this.addDoor(door);
        }

        for (const laser of message.lasers) {
          this.addLaser(laser);
        }
      });

      room.onMessage("onAddPlayer", (message: MessageOnAddPlayer) => {
        this.addPlayer({
          sessionId: message.sessionId,
          name: message.playerName,
          x: message.position.x,
          y: message.position.y,
          index: message.index, // what is this for?
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
          const crate = this.crates.get(crateUpdate.crateId);
          if (crate !== undefined) {
            crate.move(crateUpdate.direction);
          }
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

            if (door !== undefined) {
              door.isOpen = element.open;
            }

            if (button !== undefined) {
              button.isPressed = element.open;
            }
          }
        },
      );

      this.room.send("getMapInfo");
    } catch (error) {
      console.error("Error setting up Colyseus message handlers:", error);
    }
  }

  update(time: number) {
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

  private addCrate(crateInfo: CrateType) {
    const crate = new Crate(this, crateInfo.x, crateInfo.y, crateInfo.crateId);
    this.add.existing(crate);
    this.crates.set(crateInfo.crateId, crate);
  }

  private addLaser(laserInfo: LaserType) {
    const laser = new Laser(
      this,
      laserInfo.x,
      laserInfo.y,
      laserInfo.laserId,
      laserInfo.direction,
      laserInfo.range,
      laserInfo.color,
    );
    // console.log("Adding laser:", laserInfo);
    this.add.existing(laser);
    this.lasers.set(laserInfo.laserId, laser);
    laser.launch(false, laserInfo.range);
  }

  private addButton(buttonInfo: ButtonType) {
    const button = new Button(
      this,
      buttonInfo.x,
      buttonInfo.y,
      buttonInfo.buttonId,
      buttonInfo.color,
      buttonInfo.pressed,
    );
    this.add.existing(button);
    this.buttons.set(buttonInfo.buttonId, button);
  }

  private addDoor(doorInfo: DoorType) {
    const door = new Door(
      this,
      doorInfo.x,
      doorInfo.y,
      doorInfo.doorId,
      doorInfo.color,
      doorInfo.open,
    );
    this.add.existing(door);
    this.doors.set(doorInfo.doorId, door);
  }

  createMap(grid: string[][], width: number, height: number) {
    // console.log(grid);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tileType = grid[y][x];

        this.add.image(
          x * TILE_SIZE + TILE_SIZE / 2,
          y * TILE_SIZE + TILE_SIZE / 2,
          "ground",
        );

        this.add.image(
          x * TILE_SIZE + TILE_SIZE / 2,
          y * TILE_SIZE + TILE_SIZE / 2,
          tileType,
        );
      }
    }
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
