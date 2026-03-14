import { ASSETS } from "../../constants/blocks";
import type { INetworkInterface } from "../../types/network-interface";
import type { Vent as VentType } from "../../types/vent";
import { Mechanic } from "./mechanic";

export class Vent extends Mechanic implements INetworkInterface<VentType> {
  public id: number;
  public readonly networkId: string | number;
  private _isOpen: boolean;

  constructor(scene: Phaser.Scene, data: VentType) {
    super(
      scene,
      data.x,
      data.y,
      data.open ? ASSETS.VENT_OPEN : ASSETS.VENT_CLOSED,
    );
    this.id = data.id;
    this.networkId = data.id;
    this._isOpen = data.open;
  }

  public syncState(data: VentType): void {
    this.isOpen = data.open;
  }

  public set isOpen(value: boolean) {
    this._isOpen = value;
    this.setFrame(value ? ASSETS.VENT_OPEN : ASSETS.VENT_CLOSED);
    this._isOpen = this.isOpen;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }
}
