import type { Crate as CrateType } from "../../types/crate";
import type { INetworkInterface } from "../../types/network-interface";
import { Entity } from "./entity";

export class Crate extends Entity implements INetworkInterface<CrateType> {
  public readonly crateId: number;
  public readonly networkId: string | number;

  constructor(scene: Phaser.Scene, data: CrateType) {
    super(scene, data.x, data.y, "crate", null);
    this.crateId = data.crateId;
    this.networkId = data.crateId;
  }

  public get id(): number {
    return this.crateId;
  }

  public syncState(data: Partial<CrateType>): void {
    this.setPosition(data.x, data.y);
  }
}
