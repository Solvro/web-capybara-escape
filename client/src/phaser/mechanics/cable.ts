import type { Cable as CableType } from "@capybara/shared";
import type { Direction } from "@capybara/shared";
import * as Phaser from "phaser";

import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE } from "../../constants/global";
import type { INetworkInterface } from "../../types/network-interface";
import { Mechanic } from "./mechanic";

export class Cable extends Mechanic implements INetworkInterface<CableType> {
  public networkId: string;
  public cableId: string;
  public damage: boolean;
  public timer: number;
  public damageDuration: number;
  public safeDuration: number;
  public direction: Direction;

  constructor(scene: Phaser.Scene, data: CableType) {
    const posY = data.y * CELL_SIZE + CELL_SIZE / 2;

    super(
      scene,
      data.x,
      data.y,
      data.damage ? ASSETS.CABLE_END_ACTIVE : ASSETS.CABLE_END_INACTIVE,
    );

    this.networkId = data.cableId;
    this.cableId = data.cableId;
    this.damage = data.damage;
    this.timer = data.timer;
    this.damageDuration = data.damageDuration;
    this.safeDuration = data.safeDuration;
    this.direction = data.direction;

    switch (this.direction) {
      case "up": {
        this.setAngle(270);
        break;
      }
      case "right": {
        this.setAngle(0);
        break;
      }
      case "down": {
        this.setAngle(90);
        break;
      }
      case "left": {
        this.setAngle(180);
        break;
      }
    }

    this.setDepth(posY);

    this.updateVisual();
  }

  syncState = (data: CableType) => {
    this.damage = data.damage;
    this.timer = data.timer;
    this.updateVisual();
  };

  applyState(damage: boolean) {
    this.damage = damage;
    this.updateVisual();
  }

  private updateVisual() {
    const frame = this.damage
      ? ASSETS.CABLE_END_ACTIVE
      : ASSETS.CABLE_END_INACTIVE;
    this.setFrame(frame);
  }

  destroy(fromScene?: boolean) {
    super.destroy(fromScene);
  }
}
