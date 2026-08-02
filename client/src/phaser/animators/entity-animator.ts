import * as Phaser from "phaser";

import type { SpriteOffset } from "@/types/animators/sprite-animator";

import type { Direction } from "../entities/entity";

export interface EntityController {
  getDirection(): Direction | null;
  onMoveStart(direction: Direction): void;
  onMoveEnd(): void;
}

export class StateController implements EntityController {
  private direction: Direction | null = null;

  getDirection(): Direction | null {
    return this.direction;
  }

  onMoveStart(direction: Direction): void {
    this.direction = direction;
  }

  onMoveEnd(): void {
    this.direction = null;
  }
}

export class KeyboardController implements EntityController {
  private keys: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };

  constructor(keys: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  }) {
    this.keys = keys;
  }

  getDirection(): Direction | null {
    if (this.keys.left.isDown) return "left";
    if (this.keys.right.isDown) return "right";
    if (this.keys.up.isDown) return "up";
    if (this.keys.down.isDown) return "down";
    return null;
  }

  onMoveStart(_direction: Direction): void {}
  onMoveEnd(): void {}
}

export abstract class EntityAnimator {
  protected readonly controller: EntityController;
  protected lastDirection: Direction = "down";

  constructor(controller: EntityController) {
    this.controller = controller;
  }

  abstract get textureKey(): string;

  get spriteOffset(): SpriteOffset {
    return { x: 0, y: 0 };
  }

  abstract preload(scene: Phaser.Scene): void;

  abstract register(scene: Phaser.Scene): void;

  abstract animate(sprite: Phaser.GameObjects.Sprite): void;

  notifyMove(direction: Direction): void {
    this.controller.onMoveStart(direction);
  }

  notifyStop(direction: Direction): void {
    this.lastDirection = direction;
    this.controller.onMoveEnd();
  }
}
