import type { SpriteAnimator } from "../lib/sprite-animator";
import { Entity } from "./entity";

export class Crate extends Entity {
  public readonly crateId: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    crateId: number,
    textureKey = "crate",
    animator: SpriteAnimator | null = null,
  ) {
    super(scene, x, y, textureKey, animator);
    this.crateId = crateId;
  }

  public get id(): number {
    return this.crateId;
  }
}
