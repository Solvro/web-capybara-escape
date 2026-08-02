import * as Phaser from "phaser";

import { ASSETS } from "../../constants/blocks";
import { SIZE_MULTIPLIER } from "../../constants/global";
import type { Door as DoorType } from "../../types/door";
import type { INetworkInterface } from "../../types/network-interface";
import { Mechanic } from "./mechanic";

export class Door extends Mechanic implements INetworkInterface<DoorType> {
  public readonly doorId: string;
  public readonly networkId: string | number;
  public readonly color: string;
  private openFrameKey: number = ASSETS.EMPTY;
  private closedFrameKey: number = ASSETS.DOOR_CLOSED;
  private open: boolean;
  private baseSprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, data: DoorType) {
    super(
      scene,
      data.x,
      data.y,
      data.open ? ASSETS.EMPTY : ASSETS.DOOR_CLOSED,
      true,
      data.color,
    );

    this.baseSprite = this.scene.add
      .sprite(0, 0, "tileset", ASSETS.DOOR_BASE)
      .setScale(SIZE_MULTIPLIER);

    this.doorId = data.doorId;
    this.networkId = data.doorId;
    this.color = data.color;
    this.open = data.open;
    this.openFrameKey = ASSETS.EMPTY;
    this.closedFrameKey = ASSETS.DOOR_CLOSED;
    this.add(this.baseSprite);
    this.sendToBack(this.baseSprite);
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
