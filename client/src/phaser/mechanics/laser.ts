import type { Direction, Laser as LaserType } from "@capybara/shared";
import * as Phaser from "phaser";

import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";
import type { INetworkInterface } from "../../types/network-interface";
import { Mechanic } from "./mechanic";

const GHOST_IDLE_FRAMES: Record<Direction, number> = {
  right: ASSETS.GHOST_IDLE_RIGHT,
  down: ASSETS.GHOST_IDLE_DOWN,
  up: ASSETS.GHOST_IDLE_UP,
  left: ASSETS.GHOST_IDLE_RIGHT,
};

const GHOST_ACTIVE_FRAMES: Record<Direction, number> = {
  right: ASSETS.GHOST_ACTIVE_RIGHT,
  down: ASSETS.GHOST_ACTIVE_DOWN,
  up: ASSETS.GHOST_ACTIVE_UP,
  left: ASSETS.GHOST_ACTIVE_RIGHT,
};

const GHOST_COLOR_FRAMES: Record<Direction, number> = {
  right: ASSETS.GHOST_COLOR_RIGHT,
  down: ASSETS.GHOST_COLOR_DOWN,
  up: ASSETS.GHOST_COLOR_UP,
  left: ASSETS.GHOST_COLOR_RIGHT,
};

export class Laser extends Mechanic implements INetworkInterface<LaserType> {
  public readonly laserId: string;
  public readonly networkId: string | number;
  public readonly color: string;
  private launched: boolean;
  private direction: Direction;
  private range: number;
  private baseSprite: Phaser.GameObjects.Sprite;
  private beamSprites: Phaser.GameObjects.Sprite[] = [];

  constructor(scene: Phaser.Scene, data: LaserType) {
    super(
      scene,
      data.x,
      data.y,
      data.active ? GHOST_COLOR_FRAMES[data.direction] : ASSETS.EMPTY,
      true,
      data.color,
    );
    this.baseSprite = this.scene.add
      .sprite(
        0,
        0,
        "tileset",
        data.active
          ? GHOST_ACTIVE_FRAMES[data.direction]
          : GHOST_IDLE_FRAMES[data.direction],
      )
      .setScale(SIZE_MULTIPLIER);
    this.add(this.baseSprite);
    if (data.direction === "left") {
      this.sprite.setAngle(180);
      this.baseSprite.setAngle(180);
    }
    this.networkId = data.laserId;
    this.laserId = data.laserId;
    this.color = data.color;
    this.launched = data.active;
    this.direction = data.direction;
    this.range = data.range;
    this.sendToBack(this.baseSprite);
  }

  public syncState(data: LaserType) {
    this.isLaunched = data.active;
    this.range = data.range;
  }

  public get id(): string {
    return this.laserId;
  }

  public get isLaunched(): boolean {
    return this.launched;
  }

  public set isLaunched(value: boolean) {
    this.launched = value;

    if (this.launched) {
      this.sprite.setFrame(GHOST_COLOR_FRAMES[this.direction]);
      this.baseSprite.setFrame(GHOST_ACTIVE_FRAMES[this.direction]);
    } else {
      this.sprite.setFrame(ASSETS.EMPTY);
      this.baseSprite.setFrame(GHOST_IDLE_FRAMES[this.direction]);
    }

    if (this.launched) {
      this.launchLaser();
    } else {
      this.disactivateLaser();
    }
  }

  public launch(isLaunched: boolean, range: number) {
    this.range = range;
    this.isLaunched = isLaunched;
  }

  private launchLaser() {
    this.disactivateLaser();

    const isHorizontal =
      this.direction === "left" || this.direction === "right";
    const baseFrame = isHorizontal
      ? ASSETS.LASER_BEAM_HORIZONTAL
      : ASSETS.LASER_BEAM_VERTICAL;
    const tipFrame = isHorizontal
      ? ASSETS.LASER_BEAM_HORIZONTAL_TIP
      : ASSETS.LASER_BEAM_VERTICAL_TIP;

    const beamAngle = this.direction === "left" ? 180 : 0;
    const colorInt = Phaser.Display.Color.HexStringToColor(this.color).color;

    for (let index = 1; index <= this.range; index++) {
      let offsetX = 0;
      let offsetY = 0;

      switch (this.direction) {
        case "left": {
          offsetX = -index * CELL_SIZE;
          break;
        }
        case "right": {
          offsetX = index * CELL_SIZE;
          break;
        }
        case "up": {
          offsetY = -index * CELL_SIZE;
          break;
        }
        case "down": {
          offsetY = index * CELL_SIZE;
          break;
        }
      }

      const frame = index === this.range ? tipFrame : baseFrame;
      const segment = this.scene.add.sprite(offsetX, offsetY, "tileset", frame);

      segment.setAngle(beamAngle);
      if (this.direction === "up") {
        segment.setFlipY(true);
      }

      segment.setTint(colorInt);

      if (!isHorizontal && index !== this.range) {
        segment.setDisplaySize(CELL_SIZE, CELL_SIZE + SIZE_MULTIPLIER);
      } else {
        segment.setScale(SIZE_MULTIPLIER);
      }

      this.beamSprites.push(segment);
      this.add(segment);
      this.sendToBack(segment);
    }
  }

  private disactivateLaser() {
    for (const segment of this.beamSprites) {
      segment.destroy();
    }
    this.beamSprites = [];
  }
}
