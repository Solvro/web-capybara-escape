import { ASSETS } from "../../constants/blocks";
import { SIZE_MULTIPLIER } from "../../constants/global";
import { Mechanic } from "./mechanic";

export class Door extends Mechanic {
  public readonly doorId: string;
  public readonly color: string;
  private openFrameKey: number;
  private closedFrameKey: number;
  private open: boolean;
  private baseSprite: Phaser.GameObjects.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    doorId: string,
    color: string,
    open = false,
    openFrameKey = ASSETS.EMPTY,
    closedFrameKey = ASSETS.DOOR_CLOSED,
  ) {
    super(scene, x, y, open ? openFrameKey : closedFrameKey, true, color);

    this.baseSprite = this.scene.add
      .sprite(0, 0, "tileset", ASSETS.DOOR_BASE)
      .setScale(SIZE_MULTIPLIER);

    this.doorId = doorId;
    this.color = color;
    this.open = open;
    this.openFrameKey = openFrameKey;
    this.closedFrameKey = closedFrameKey;
    this.add(this.baseSprite);
    this.sendToBack(this.baseSprite);
  }

  public get id(): string {
    return this.doorId;
  }

  public get isOpen(): boolean {
    return this.open;
  }

  public set isOpen(value: boolean) {
    this.open = value;
    const frameKey = this.open ? this.openFrameKey : this.closedFrameKey;
    this.setFrame(frameKey);
  }
}
