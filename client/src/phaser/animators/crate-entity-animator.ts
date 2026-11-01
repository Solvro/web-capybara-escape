import * as Phaser from "phaser";

import { CRATE_ANIM_CONFIG } from "@/constants/animators/crate-animator-config";
import type { SpriteOffset } from "@/types/animators/sprite-animator";

import { EntityAnimator } from "./entity-animator";
import type { EntityController } from "./entity-animator";
import { SpriteAnimator } from "./sprite-animator";

export const CRATE_TEXTURE_KEY = "crate";

export class CrateEntityAnimator extends EntityAnimator {
  private readonly spriteAnimator: SpriteAnimator;
  private readonly spritesheetPath: string;

  constructor(spritesheetPath: string, controller: EntityController) {
    super(controller);
    this.spritesheetPath = spritesheetPath;
    this.spriteAnimator = new SpriteAnimator(
      CRATE_TEXTURE_KEY,
      CRATE_ANIM_CONFIG,
    );
  }

  get textureKey(): string {
    return this.spriteAnimator.textureKey;
  }

  getAnimKey(animName: string): string {
    return this.spriteAnimator.getAnimKey(animName);
  }

  get spriteOffset(): SpriteOffset {
    return CRATE_ANIM_CONFIG.spriteOffset ?? { x: 0, y: 0 };
  }

  preload(scene: Phaser.Scene): void {
    scene.load.spritesheet(
      this.spriteAnimator.textureKey,
      this.spritesheetPath,
      {
        frameWidth: CRATE_ANIM_CONFIG.frameWidth,
        frameHeight: CRATE_ANIM_CONFIG.frameHeight,
      },
    );
  }

  register(scene: Phaser.Scene): void {
    this.spriteAnimator.register(scene);
  }

  animate(sprite: Phaser.GameObjects.Sprite): void {
    this.spriteAnimator.playOnce(sprite, "idle");
  }

  burn(sprite: Phaser.GameObjects.Sprite): void {
    this.spriteAnimator.stop(sprite, "idle");
    this.spriteAnimator.playOnce(sprite, "burn-up");
  }
}
