import { Entity } from "./entity";

export class Capybara extends Entity {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "capybara");
  }
}
