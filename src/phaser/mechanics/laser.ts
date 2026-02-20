import { TILE_SIZE } from "../lib/const";
import { Mechanic } from "./mechanic";

export class Laser extends Mechanic {
  public readonly laserId: string;
  public readonly color: string;
  private launched: boolean;
  private launchedTextureKey: string;
  private disactivatedTextureKey: string;
  private laserLineTextureKey: string;
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
    launchedTextureKey = "laser-gun",
    disactivatedTextureKey = "laser-gun",
    laserLineTextureKey = "laser-line",
  ) {
    super(scene, x, y, launched ? launchedTextureKey : disactivatedTextureKey);
    this.laserId = laserId;
    this.color = color;
    this.launched = launched;
    this.launchedTextureKey = launchedTextureKey;
    this.disactivatedTextureKey = disactivatedTextureKey;
    this.laserLineTextureKey = laserLineTextureKey;
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
    const textureKey = this.launched
      ? this.launchedTextureKey
      : this.disactivatedTextureKey;
    this.changeTexture(textureKey);

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
          offsetX = -index * TILE_SIZE;
          break;
        case "right":
          offsetX = index * TILE_SIZE;
          break;
        case "up":
          offsetY = -index * TILE_SIZE;
          break;
        case "down":
          offsetY = index * TILE_SIZE;
          break;
      }
      const segment = this.scene.add.sprite(
        offsetX,
        offsetY,
        this.laserLineTextureKey,
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
