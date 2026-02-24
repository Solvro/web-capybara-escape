import {
  CELL_SIZE,
  SCALE_FACTOR,
  SIZE_MULTIPLIER,
} from "../../constants/global";
import type { SpriteAnimator } from "../lib/sprite-animator";

export type Direction = "left" | "right" | "up" | "down";

export class Entity extends Phaser.GameObjects.Container {
  protected sprite: Phaser.GameObjects.Sprite;
  protected gridX: number;
  protected gridY: number;
  protected animator: SpriteAnimator | null;

  constructor(
    scene: Phaser.Scene,
    gridX: number,
    gridY: number,
    textureKey = "player",
    animator: SpriteAnimator | null = null,
  ) {
    super(scene);

    this.gridX = gridX;
    this.gridY = gridY;
    this.animator = animator;

    this.sprite = this.scene.add.sprite(0, 0, textureKey);
    if (textureKey !== "crate") {
      this.sprite.setScale(SCALE_FACTOR * SIZE_MULTIPLIER);
    } else {
      this.sprite.setScale(SIZE_MULTIPLIER);
    }
    this.add(this.sprite);

    this.setPosition(
      this.gridX * CELL_SIZE + CELL_SIZE / 2,
      this.gridY * CELL_SIZE + CELL_SIZE / 2,
    );

    this.setDepth(this.y);
  }

  playAnim(animName: string): void {
    if (this.animator !== null) {
      this.animator.play(this.sprite, animName);
    }
  }

  stopAnim(animName: string, idleAnimName?: string): void {
    if (this.animator !== null) {
      this.animator.stop(this.sprite, animName, idleAnimName);
    }
  }

  move(direction: Direction, ease = "Linear") {
    const walkAnimName = `walk-${direction}`;

    switch (direction) {
      case "left": {
        this.gridX -= 1;
        break;
      }
      case "right": {
        this.gridX += 1;
        break;
      }
      case "up": {
        this.gridY -= 1;
        break;
      }
      case "down": {
        this.gridY += 1;
        break;
      }
    }

    const targetX = this.gridX * CELL_SIZE + CELL_SIZE / 2;
    const targetY = this.gridY * CELL_SIZE + CELL_SIZE / 2;

    this.playAnim(walkAnimName);

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: 200,
      ease,
      onComplete: () => {
        this.setPosition(targetX, targetY);
        this.stopAnim(walkAnimName, `idle-${direction}`);
      },
    });

    this.setDepth(targetY);
  }

  destroy(): void {
    this.sprite.destroy();
    super.destroy();
  }
}
