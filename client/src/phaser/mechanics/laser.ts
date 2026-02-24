import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE } from "../../constants/global";
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
    super(scene, x, y, launched ? launchedFrameKey : disactivatedFrameKey);
    this.laserId = laserId;
    this.color = color;
    this.launched = launched;
    this.launchedFrameKey = launchedFrameKey;
    this.disactivatedFrameKey = disactivatedFrameKey;
    this.laserLineFrameKey = laserLineFrameKey;
    this.direction = direction;
    this.range = range;
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

    for (let index = 1; index <= this.range; index++) {
      let offsetX = 0;
      let offsetY = 0;
      switch (this.direction) {
        case "left":
          offsetX = -index * CELL_SIZE;
          break;
        case "right":
          offsetX = index * CELL_SIZE;
          break;
        case "up":
          offsetY = -index * CELL_SIZE;
          break;
        case "down":
          offsetY = index * CELL_SIZE;
          break;
      }
      const segment = this.scene.add.sprite(
        offsetX,
        offsetY,
        "tileset",
        this.laserLineFrameKey,
      );
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
