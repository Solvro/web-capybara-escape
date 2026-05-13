import { EntityAnimator } from "./EntityAnimator";
import type { EntityController } from "./EntityAnimator";

type CapybaraDirection = "back" | "front" | "left" | "right";

const DIRECTION_MAP: Record<string, CapybaraDirection> = {
  up: "back",
  down: "front",
  left: "left",
  right: "right",
};

const FRAME_COUNT = 3;
const FRAME_RATE = 6;
const TEXTURE_PREFIX = "capybara";

export class CapybaraEntityAnimator extends EntityAnimator {
  private readonly baseImagePath: string;
  private readonly initialTextureKey: string;

  constructor(baseImagePath: string, controller: EntityController) {
    super(controller);
    this.baseImagePath = baseImagePath.replace(/\/$/, "");
    this.initialTextureKey = `${TEXTURE_PREFIX}-front-1`;
  }

  get textureKey(): string {
    return this.initialTextureKey;
  }

  preload(scene: Phaser.Scene): void {
    for (const dir of Object.values(DIRECTION_MAP)) {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        scene.load.image(
          `${TEXTURE_PREFIX}-${dir}-${String(i)}`,
          `${this.baseImagePath}/${dir}_${String(i)}.png`,
        );
      }
    }
  }

  register(scene: Phaser.Scene): void {
    for (const dir of Object.values(DIRECTION_MAP)) {
      const frames = Array.from({ length: FRAME_COUNT }, (_, i) => ({
        key: `${TEXTURE_PREFIX}-${dir}-${String(i + 1)}`,
      }));

      scene.anims.create({
        key: `${TEXTURE_PREFIX}:walk-${dir}`,
        frames,
        frameRate: FRAME_RATE,
        repeat: -1,
      });

      scene.anims.create({
        key: `${TEXTURE_PREFIX}:idle-${dir}`,
        frames: [{ key: `${TEXTURE_PREFIX}-${dir}-1` }],
        frameRate: 1,
        repeat: 0,
      });
    }
  }

  animate(sprite: Phaser.GameObjects.Sprite): void {
    const direction = this.controller.getDirection();

    if (direction !== null) {
      this.lastDirection = direction;
      const capyDir = DIRECTION_MAP[direction];
      sprite.play(`${TEXTURE_PREFIX}:walk-${capyDir}`, true);
    } else {
      const capyDir = DIRECTION_MAP[this.lastDirection];
      const idleKey = `${TEXTURE_PREFIX}:idle-${capyDir}`;
      if (
        !sprite.anims.isPlaying ||
        sprite.anims.currentAnim?.key !== idleKey
      ) {
        sprite.play(idleKey, true);
      }
    }
  }
}
