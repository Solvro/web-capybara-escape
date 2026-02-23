import { ASSETS } from "../../constants/blocks";
import { Mechanic } from "./mechanic";

export class Vent extends Mechanic {
  public id: number;
  private _isOpen: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    id: number,
    isOpen: boolean,
  ) {
    super(scene, x, y, isOpen ? ASSETS.VENT_OPEN : ASSETS.VENT_CLOSED);
    this.id = id;
    this._isOpen = isOpen;
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
