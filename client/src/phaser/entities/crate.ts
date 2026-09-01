import type { Crate as CrateType, Direction } from "@capybara/shared";
import * as Phaser from "phaser";

import { ASSETS } from "../../constants/blocks";
import type { INetworkInterface } from "../../types/network-interface";
import { Entity } from "./entity";

export class Crate extends Entity implements INetworkInterface<CrateType> {
  public readonly crateId: number;
  public readonly networkId: string | number;

  constructor(scene: Phaser.Scene, data: CrateType) {
    super(scene, data.x, data.y, "tileset", null);
    this.sprite.setFrame(data.isSteel ? ASSETS.STEEL_BOX : ASSETS.CRATE);
    this.crateId = data.crateId;
    this.networkId = data.crateId;
  }

  public get id(): number {
    return this.crateId;
  }

  public syncState(
    data: Partial<{
      crateId: number;
      direction: Direction;
    }>,
  ): void {
    if (data.direction) {
      this.move(data.direction);
    }
  }
}
