import type { Crate as CrateType } from "@capybara/shared";

import type { CrateEntityAnimator } from "../animators/crate-entity-animator";
import { Crate } from "./crate";

export class BreakableCrate extends Crate {
  private readonly crateAnimator: CrateEntityAnimator | null;
  private deathTime: number;
  constructor(
    scene: Phaser.Scene,
    data: CrateType,
    animator: CrateEntityAnimator,
    deathTime: number,
  ) {
    super(scene, data, animator);
    this.crateAnimator = animator;
    this.deathTime = deathTime;
    super.animate();
  }

  destroy(): void {
    this.crateAnimator?.burn(this.sprite);
    setTimeout(() => {
      super.destroy;
    }, this.deathTime);
  }
}
