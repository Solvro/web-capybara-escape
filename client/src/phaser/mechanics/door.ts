import { ASSETS } from "../../constants/blocks";
import type { Door as DoorType } from "../../types/door";
import type { INetworkInterface } from "../../types/network-interface";
import { Mechanic } from "./mechanic";

export class Door extends Mechanic implements INetworkInterface<DoorType> {
  public readonly doorId: string;
  public readonly networkId: string | number;
  public readonly color: string;
  private openFrameKey: number = ASSETS.DOOR_OPEN;
  private closedFrameKey: number = ASSETS.DOOR_CLOSED;
  private open: boolean;

  constructor(scene: Phaser.Scene, data: DoorType) {
    super(
      scene,
      data.x,
      data.y,
      data.open ? ASSETS.DOOR_OPEN : ASSETS.DOOR_CLOSED,
      true,
      data.color,
    );
    this.doorId = data.doorId;
    this.networkId = data.doorId;
    this.color = data.color;
    this.open = data.open;
    this.openFrameKey = ASSETS.DOOR_OPEN;
    this.closedFrameKey = ASSETS.DOOR_CLOSED;
  }

  public syncState(data: Partial<DoorType>) {
    if (data.open !== undefined) {
      this.isOpen = data.open;
    }
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
