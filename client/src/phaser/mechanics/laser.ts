import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE } from "../../constants/global";
import type { Laser as LaserType } from "../../types/laser";
import type { INetworkInterface } from "../../types/network-interface";
import { Mechanic } from "./mechanic";

export class Laser extends Mechanic implements INetworkInterface<LaserType> {
  public readonly laserId: string;
  public readonly networkId: string | number;
  public readonly color: string;
  private launched: boolean;
  private launchedFrameKey: number = ASSETS.LASER_GUN_FIRED;
  private disactivatedFrameKey: number = ASSETS.LASER_GUN;
  private laserLineFrameKey: number = ASSETS.LASER_LINE;
  private direction: "left" | "right" | "up" | "down";
  private range: number;
  private laserLine: Phaser.GameObjects.Sprite[] = [];

  constructor(scene: Phaser.Scene, data: LaserType) {
    super(scene, data.x, data.y, ASSETS.LASER_GUN);
    this.laserId = data.laserId;
    this.color = data.color;
    this.launched = false;
    this.direction = data.direction;
    this.range = data.range;
    this.networkId = data.laserId;
  }

  public syncState(data: Partial<LaserType>): void {
    //
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
