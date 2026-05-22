import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";
import type { EntityAnimator } from "../animators/entity-animator";

export type Direction = "left" | "right" | "up" | "down";

export class Entity extends Phaser.GameObjects.Container {
  protected sprite: Phaser.GameObjects.Sprite;
  protected gridX: number;
  protected gridY: number;
  protected animator: EntityAnimator | null;

  constructor(
    scene: Phaser.Scene,
    gridX: number,
    gridY: number,
    textureKey = "player",
    animator: EntityAnimator | null = null,
  ) {
    super(scene);

    this.gridX = gridX;
    this.gridY = gridY;
    this.animator = animator;

    const spriteOffset = animator?.spriteOffset ?? { x: 0, y: 0 };
    this.sprite = this.scene.add.sprite(
      spriteOffset.x * SIZE_MULTIPLIER,
      spriteOffset.y * SIZE_MULTIPLIER,
      textureKey,
    );
    this.sprite.setScale(SIZE_MULTIPLIER);
    this.add(this.sprite);

    this.setPosition(
      this.gridX * CELL_SIZE + CELL_SIZE / 2,
      this.gridY * CELL_SIZE + CELL_SIZE / 2,
    );

    this.setDepth(this.y);
  }

  animate(): void {
    if (this.animator !== null) {
      this.animator.animate(this.sprite);
    }
  }

  move(direction: Direction, ease = "Linear") {
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

    this.animator?.notifyMove(direction);

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: 200,
      ease,
      onUpdate: () => {
        this.setDepth(this.y);
      },
      onComplete: () => {
        this.setPosition(targetX, targetY);
        this.animator?.notifyStop(direction);
      },
    });
  }

  destroy(): void {
    this.sprite.destroy();
    super.destroy();
  }
}
