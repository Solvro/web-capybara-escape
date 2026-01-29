import * as Phaser from "phaser";

import { TILE_SIZE } from "../lib/const";

export class Cable extends Phaser.GameObjects.Container {
  public cableId: string;
  private core: Phaser.GameObjects.Rectangle;
  private glow: Phaser.GameObjects.Rectangle;
  public isActive: boolean = false;
  public timer: number = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    cableId: string,
    active = false,
    timer = 0,
  ) {
    super(scene, x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
    this.cableId = cableId;
    this.isActive = active;
    this.timer = timer;

    // background / base
    this.core = scene.add.rectangle(
      0,
      0,
      TILE_SIZE * 0.6,
      TILE_SIZE * 0.6,
      0x2b3340,
    );
    this.core.setStrokeStyle(2, 0x111827);
    this.add(this.core);

    // glow for active state
    this.glow = scene.add.rectangle(
      0,
      0,
      TILE_SIZE * 0.7,
      TILE_SIZE * 0.7,
      0x00d4ff,
      0.0,
    );
    this.add(this.glow);

    this.setDepth(20);
    scene.add.existing(this);

    this.applyState(active, timer);
  }

  applyState(active: boolean, timer?: number) {
    this.isActive = active;
    if (typeof timer === "number") this.timer = timer;

    if (this.isActive) {
      this.core.setFillStyle(0x58c7ff);
      this.glow.setAlpha(0.75);
    } else {
      this.core.setFillStyle(0x2b3340);
      this.glow.setAlpha(0.0);
    }
  }

  destroy(fromScene?: boolean) {
    this.core.destroy();
    this.glow.destroy();
    super.destroy(fromScene);
  }
}
