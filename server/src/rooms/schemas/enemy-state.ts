import { MapSchema, Schema, type } from "@colyseus/schema";

import { Enemy } from "./enemy";

export class EnemyState extends Schema {
  @type({ map: Enemy })
  enemies = new MapSchema<Enemy>();

  private nextId = 0;

  createEnemy(x: number, y: number): Enemy {
    const id = this.nextId++;
    const enemy = new Enemy(x, y, id);
    this.enemies.set(String(id), enemy);
    return enemy;
  }

  clear(): void {
    this.enemies.clear();
    this.nextId = 0;
  }
}
