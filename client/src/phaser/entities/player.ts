import type { Direction } from "@capybara/shared";
import * as Phaser from "phaser";

import type { EntityAnimator } from "../animators/entity-animator";
import { Entity } from "./entity";

export class Player extends Entity {
  public readonly name: string;
  public readonly sessionId: string;
  public readonly local: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    sessionId: string,
    local = false,
    textureKey = "player",
    animator: EntityAnimator | null = null,
  ) {
    super(scene, x, y, textureKey, animator);
    this.name = name;
    this.sessionId = sessionId;
    this.local = local;
  }

  move(direction: Direction, ease = "Circular") {
    super.move(direction, ease);
  }

  public get playerName(): string {
    return this.name;
  }

  public get id(): string {
    return this.sessionId;
  }

  public get isLocal(): boolean {
    return this.local;
  }
}
