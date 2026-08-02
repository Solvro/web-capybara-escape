import * as Phaser from "phaser";

import { ENEMY_ANIM_CONFIG } from "@/constants/animators/enemy-animator-config";
import type { SpriteOffset } from "@/types/animators/sprite-animator";

import { EntityAnimator } from "./entity-animator";
import type { EntityController } from "./entity-animator";
import { SpriteAnimator } from "./sprite-animator";

const ENEMY_TEXTURE_KEY = "enemy";

export class EnemyEntityAnimator extends EntityAnimator {
  private readonly spriteAnimator: SpriteAnimator;
  private readonly spritesheetPath: string;

  constructor(spritesheetPath: string, controller: EntityController) {
    super(controller);
    this.spritesheetPath = spritesheetPath;
    this.spriteAnimator = new SpriteAnimator(
      ENEMY_TEXTURE_KEY,
      ENEMY_ANIM_CONFIG,
    );
  }

  get textureKey(): string {
    return this.spriteAnimator.textureKey;
  }

  get spriteOffset(): SpriteOffset {
    return ENEMY_ANIM_CONFIG.spriteOffset ?? { x: 0, y: 0 };
  }

  preload(scene: Phaser.Scene): void {
    scene.load.spritesheet(
      this.spriteAnimator.textureKey,
      this.spritesheetPath,
      {
        frameWidth: ENEMY_ANIM_CONFIG.frameWidth,
        frameHeight: ENEMY_ANIM_CONFIG.frameHeight,
      },
    );
  }

  register(scene: Phaser.Scene): void {
    this.spriteAnimator.register(scene);
  }

  animate(sprite: Phaser.GameObjects.Sprite): void {
    const direction = this.controller.getDirection();

    if (direction !== null) {
      this.lastDirection = direction;
      this.spriteAnimator.play(sprite, `walk-${direction}`);
    } else {
      this.spriteAnimator.play(sprite, `idle-${this.lastDirection}`);
    }
  }
}
