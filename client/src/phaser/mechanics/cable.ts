import * as Phaser from "phaser";

import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE } from "../../constants/global";
import { Mechanic } from "./mechanic";

export class Cable extends Mechanic {
  public cableId: string;
  public damage: boolean;
  public timer: number;
  public damageDuration: number;
  public safeDuration: number;
  public direction: "up" | "down" | "left" | "right";

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    id: string,
    damaged: boolean,
    timer: number,
    damageDuration: number,
    safeDuration: number,
    direction: "up" | "down" | "left" | "right",
  ) {
    const posY = y * CELL_SIZE + CELL_SIZE / 2;

    super(
      scene,
      x,
      y,
      damaged ? ASSETS.CABLE_END_ACTIVE : ASSETS.CABLE_END_INACTIVE,
    );

    this.cableId = id;
    this.damage = damaged;
    this.timer = timer;
    this.damageDuration = damageDuration;
    this.safeDuration = safeDuration;
    this.direction = direction;

    switch (this.direction) {
      case "up":
        this.setAngle(270);
        break;
      case "right":
        this.setAngle(0);
        break;
      case "down":
        this.setAngle(90);
        break;
      case "left":
        this.setAngle(180);
        break;
    }

    this.setDepth(posY);

    this.updateVisual();
  }

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
