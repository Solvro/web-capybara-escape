import { ASSETS } from "../lib/const";
import { Mechanic } from "./mechanic";

export class Door extends Mechanic {
  public readonly doorId: string;
  public readonly color: string;
  private openFrameKey: number;
  private closedFrameKey: number;
  private open: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    doorId: string,
    color: string,
    open = false,
    openFrameKey = ASSETS.DOOR_OPEN,
    closedFrameKey = ASSETS.DOOR_CLOSED,
  ) {
    super(scene, x, y, open ? openFrameKey : closedFrameKey);
    this.doorId = doorId;
    this.color = color;
    this.open = open;
    this.openFrameKey = openFrameKey;
    this.closedFrameKey = closedFrameKey;
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
