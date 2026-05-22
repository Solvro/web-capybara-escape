import type { EntityAnimator } from "../animators/entity-animator";
import { Entity } from "./entity";

export class Capybara extends Entity {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    animator: EntityAnimator | null = null,
  ) {
    super(scene, x, y, animator?.textureKey ?? "capybara", animator);
  }
}
