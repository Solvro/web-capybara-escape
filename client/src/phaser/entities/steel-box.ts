import { ASSETS } from "../../constants/blocks";
import type { INetworkInterface } from "../../types/network-interface";
import type { SteelBox as SteelBoxType } from "../../types/steel-box";
import { Entity } from "./entity";

export class SteelBox
  extends Entity
  implements INetworkInterface<SteelBoxType>
{
  public readonly steelBoxId: number;
  public readonly networkId: string | number;

  constructor(scene: Phaser.Scene, data: SteelBoxType) {
    super(scene, data.x, data.y, "tileset", null);
    this.sprite.setFrame(ASSETS.STEEL_BOX);
    this.steelBoxId = data.steelBoxId;
    this.networkId = data.steelBoxId;
  }

  public get id(): number {
    return this.steelBoxId;
  }

  public syncState(
    data: Partial<{
      steelBoxId: number;
      direction: "left" | "right" | "up" | "down";
    }>,
  ): void {
    if (data.direction) {
      this.move(data.direction);
    }
  }
}
