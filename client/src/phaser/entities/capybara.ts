import type { Capybara as CapybaraState } from "../../types/capybara";
import type { CapybaraEntityAnimator } from "../animators/capybara-entity-animator";
import { Entity } from "./entity";

export class Capybara extends Entity {
  private readonly capybaraAnimator: CapybaraEntityAnimator | null;
  private serverState = "idle";
  private isJumping = false;
  private pendingJumpTarget: { x: number; y: number } | null = null;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    animator: CapybaraEntityAnimator | null = null,
  ) {
    super(scene, x, y, animator?.textureKey ?? "capybara", animator);
    this.capybaraAnimator = animator;
  }

  animate(): void {
    if (this.isJumping) {
      return;
    }

    if (this.pendingJumpTarget !== null) {
      this.tryStartJump();
    }

    super.animate();
  }

  syncServerState({ x, y, state }: CapybaraState): void {
    if (state === "jump") {
      this.serverState = state;
      if (!this.isJumping) {
        this.pendingJumpTarget = { x, y };
        this.tryStartJump();
      }
      return;
    }

    if (this.serverState === "jump") {
      this.isJumping = false;
      this.pendingJumpTarget = null;
      this.setVisible(true);
    }

    this.serverState = state;
    this.syncGridPosition(x, y);
  }

  private tryStartJump(): void {
    if (this.pendingJumpTarget === null || this.isJumping) {
      return;
    }

    if (this.scene.tweens.isTweening(this)) {
      return;
    }

    const { x, y } = this.pendingJumpTarget;

    if (this.gridX !== x || this.gridY !== y) {
      this.syncGridPosition(x, y, () => {
        this.tryStartJump();
      });
      return;
    }

    this.pendingJumpTarget = null;
    this.startJumpAnimation();
  }

  private startJumpAnimation(): void {
    if (this.isJumping) {
      return;
    }

    this.isJumping = true;
    this.animator?.notifyStop("down");
    this.capybaraAnimator?.playJump(this.sprite, () => {
      this.setVisible(false);
    });
  }
}
