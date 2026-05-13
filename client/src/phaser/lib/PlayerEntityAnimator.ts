import { TILE_SIZE_OLD } from "../../constants/global";
import { EntityAnimator } from "./EntityAnimator";
import type { EntityController } from "./EntityAnimator";
import { SpriteAnimator } from "./sprite-animator";
import type { SpriteAnimatorConfig } from "./sprite-animator";

const PLAYER_ANIM_CONFIG: SpriteAnimatorConfig = {
  frameWidth: TILE_SIZE_OLD,
  frameHeight: TILE_SIZE_OLD,
  animations: [
    { name: "walk-up", startFrame: 0, endFrame: 3, frameRate: 8, loop: true },
    { name: "idle-up", startFrame: 0, endFrame: 0, frameRate: 1, loop: false },
    { name: "walk-down", startFrame: 4, endFrame: 7, frameRate: 8, loop: true },
    {
      name: "idle-down",
      startFrame: 4,
      endFrame: 4,
      frameRate: 1,
      loop: false,
    },
    {
      name: "walk-left",
      startFrame: 8,
      endFrame: 11,
      frameRate: 8,
      loop: true,
    },
    {
      name: "idle-left",
      startFrame: 8,
      endFrame: 8,
      frameRate: 1,
      loop: false,
    },
    {
      name: "walk-right",
      startFrame: 12,
      endFrame: 15,
      frameRate: 8,
      loop: true,
    },
    {
      name: "idle-right",
      startFrame: 12,
      endFrame: 12,
      frameRate: 1,
      loop: false,
    },
  ],
};

export class PlayerEntityAnimator extends EntityAnimator {
  private readonly spriteAnimator: SpriteAnimator;
  private readonly spritesheetPath: string;

  constructor(
    textureKey: string,
    spritesheetPath: string,
    controller: EntityController,
  ) {
    super(controller);
    this.spritesheetPath = spritesheetPath;
    this.spriteAnimator = new SpriteAnimator(textureKey, PLAYER_ANIM_CONFIG);
  }

  get textureKey(): string {
    return this.spriteAnimator.textureKey;
  }

  preload(scene: Phaser.Scene): void {
    scene.load.spritesheet(
      this.spriteAnimator.textureKey,
      this.spritesheetPath,
      {
        frameWidth: PLAYER_ANIM_CONFIG.frameWidth,
        frameHeight: PLAYER_ANIM_CONFIG.frameHeight,
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
