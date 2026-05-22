import { CAPYBARA_ANIM_CONFIG } from "./config/capybara-animator-config";
import { EntityAnimator } from "./entity-animator";
import type { EntityController } from "./entity-animator";
import { SpriteAnimator } from "./sprite-animator";
import type { SpriteOffset } from "./sprite-animator";

const CAPYBARA_TEXTURE_KEY = "capybara";

export class CapybaraEntityAnimator extends EntityAnimator {
  private readonly spriteAnimator: SpriteAnimator;
  private readonly spritesheetPath: string;

  constructor(spritesheetPath: string, controller: EntityController) {
    super(controller);
    this.spritesheetPath = spritesheetPath;
    this.spriteAnimator = new SpriteAnimator(
      CAPYBARA_TEXTURE_KEY,
      CAPYBARA_ANIM_CONFIG,
    );
  }

  get textureKey(): string {
    return this.spriteAnimator.textureKey;
  }

  get spriteOffset(): SpriteOffset {
    return CAPYBARA_ANIM_CONFIG.spriteOffset ?? { x: 0, y: 0 };
  }

  preload(scene: Phaser.Scene): void {
    scene.load.spritesheet(
      this.spriteAnimator.textureKey,
      this.spritesheetPath,
      {
        frameWidth: CAPYBARA_ANIM_CONFIG.frameWidth,
        frameHeight: CAPYBARA_ANIM_CONFIG.frameHeight,
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
      this.spriteAnimator.stop(
        sprite,
        `walk-${this.lastDirection}`,
        `idle-${this.lastDirection}`,
      );
    }
  }
}
