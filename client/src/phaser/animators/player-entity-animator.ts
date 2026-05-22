import { EntityAnimator } from "./entity-animator";
import type { EntityController } from "./entity-animator";
import { SpriteAnimator } from "./sprite-animator";
import type { SpriteAnimatorConfig, SpriteOffset } from "./sprite-animator";

export class PlayerEntityAnimator extends EntityAnimator {
  private readonly spriteAnimator: SpriteAnimator;
  private readonly spritesheetPath: string;
  private readonly config: SpriteAnimatorConfig;

  constructor(
    textureKey: string,
    spritesheetPath: string,
    config: SpriteAnimatorConfig,
    controller: EntityController,
  ) {
    super(controller);
    this.spritesheetPath = spritesheetPath;
    this.config = config;
    this.spriteAnimator = new SpriteAnimator(textureKey, config);
  }

  get textureKey(): string {
    return this.spriteAnimator.textureKey;
  }

  get spriteOffset(): SpriteOffset {
    return this.config.spriteOffset ?? { x: 0, y: 0 };
  }

  preload(scene: Phaser.Scene): void {
    scene.load.spritesheet(
      this.spriteAnimator.textureKey,
      this.spritesheetPath,
      {
        frameWidth: this.config.frameWidth,
        frameHeight: this.config.frameHeight,
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
