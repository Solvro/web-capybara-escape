import * as Phaser from "phaser";

import type { Enemy as EnemyState } from "../../types/enemy";
import type { INetworkInterface } from "../../types/network-interface";
import type { EnemyEntityAnimator } from "../animators/enemy-entity-animator";
import { Entity } from "./entity";

export class Enemy extends Entity implements INetworkInterface<EnemyState> {
  readonly enemyId: number;
  readonly networkId: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    id: number,
    animator: EnemyEntityAnimator | null = null,
  ) {
    super(scene, x, y, animator?.textureKey ?? "enemy", animator);
    this.enemyId = id;
    this.networkId = id;
  }

  get id(): number {
    return this.enemyId;
  }

  syncState({ x, y }: EnemyState): void {
    this.syncGridPosition(x, y);
  }
}
