import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";
import { Mechanic } from "./mechanic";

export class Laser extends Mechanic {
  public readonly laserId: string;
  public readonly color: string;
  private launched: boolean;
  private launchedFrameKey: number;
  private disactivatedFrameKey: number;
  private laserLineFrameKey: number;
  private direction: "left" | "right" | "up" | "down";
  private range: number;
  private laserLine: Phaser.GameObjects.Sprite[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    laserId: string,
    direction: "left" | "right" | "up" | "down",
    range: number,
    color: string,
    launched = false,
    launchedFrameKey = ASSETS.LASER_GUN_FIRED,
    disactivatedFrameKey = ASSETS.LASER_GUN,
    laserLineFrameKey = ASSETS.LASER_LINE,
  ) {
    super(
      scene,
      x,
      y,
      launched ? launchedFrameKey : disactivatedFrameKey,
      true,
      color,
    );
    this.laserId = laserId;
    this.color = color;
    this.launched = launched;
    this.launchedFrameKey = launchedFrameKey;
    this.disactivatedFrameKey = disactivatedFrameKey;
    this.laserLineFrameKey = laserLineFrameKey;
    this.direction = direction;
    this.range = range;

    this.updateCannonRotation();

    if (this.launched) {
      this.launchLaser();
    }
  }

  public get id(): string {
    return this.laserId;
  }

  public get isLaunched(): boolean {
    return this.launched;
  }

  public set isLaunched(value: boolean) {
    this.launched = value;
    const frameKey = this.launched
      ? this.launchedFrameKey
      : this.disactivatedFrameKey;
    this.setFrame(frameKey);

    this.updateCannonRotation();

    if (this.launched) {
      this.launchLaser();
    } else {
      this.disactivateLaser();
    }
  }

  private updateCannonRotation() {
    let angle = 0;
    switch (this.direction) {
      case "up": {
        angle = 0;
        break;
      }
      case "right": {
        angle = 90;
        break;
      }
      case "down": {
        angle = 180;
        break;
      }
      case "left": {
        angle = -90;
        break;
      }
    }
    this.sprite.setAngle(angle);
  }

  public launch(isLaunched: boolean, range: number) {
    this.range = range;
    this.isLaunched = isLaunched;
  }

  private launchLaser() {
    this.disactivateLaser();

    const colorInt = Phaser.Display.Color.HexStringToColor(this.color).color;

    // Horizontal beam needs 90° rotation since the line tile is vertical by default
    const isHorizontal =
      this.direction === "left" || this.direction === "right";
    const beamAngle = isHorizontal ? 90 : 0;

    for (let i = 1; i <= this.range; i++) {
      let x = 0;
      let y = 0;
      switch (this.direction) {
        case "right": {
          x = i * CELL_SIZE;
          break;
        }
        case "left": {
          x = -i * CELL_SIZE;
          break;
        }
        case "up": {
          y = -i * CELL_SIZE;
          break;
        }
        case "down": {
          y = i * CELL_SIZE;
          break;
        }
      }

      const segment = this.scene.add.sprite(
        x,
        y,
        "tileset",
        this.laserLineFrameKey,
      );
      segment.setScale(SIZE_MULTIPLIER);
      segment.setAngle(beamAngle);
      segment.setTint(colorInt);

      this.laserLine.push(segment);
      this.add(segment);
    }
  }

  private disactivateLaser() {
    for (const segment of this.laserLine) {
      segment.destroy();
    }
    this.laserLine = [];
  }
}
