import * as Phaser from "phaser";
import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";


export class Cable extends Phaser.GameObjects.Container {
  public cableId: string;
  public damage: boolean;
  public timer: number;
  public damageDuration: number;
  public safeDuration: number;
  public direction: "up" | "down" | "left" | "right"; 

  private sprite: Phaser.GameObjects.Image;

  constructor(
    scene: Phaser.Scene,
    gridX: number,
    gridY: number,
    id: string,
    damage: boolean = false,
    timer: number = 0,
    damageDuration: number = 0,
    safeDuration: number = 0,
    direction: "up" | "down" | "left" | "right" = "up", 
  ) {
    const posX = gridX * CELL_SIZE + CELL_SIZE / 2;
    const posY = gridY * CELL_SIZE + CELL_SIZE / 2;
    super(scene, posX, posY);

    this.cableId = id;
    this.damage = damage;
    this.timer = timer;
    this.damageDuration = damageDuration;
    this.safeDuration = safeDuration;
    this.direction = direction; 

    this.sprite = scene.add.image(0, 0, damage ? "cable-on" : "cable-off");
    this.sprite.setScale(SIZE_MULTIPLIER);
    this.add(this.sprite);

    // orient sprite to direction
    switch (this.direction) {
      case "up":
        this.sprite.setAngle(0);
        break;
      case "right":
        this.sprite.setAngle(90);
        break;
      case "down":
        this.sprite.setAngle(180);
        break;
      case "left":
        this.sprite.setAngle(270);
        break;
    }

    this.setDepth(posY);
    scene.add.existing(this);

    this.updateVisual();
  }

  applyState(damage: boolean, timer: number, damageDuration?: number, safeDuration?: number) {
    this.damage = damage;
    this.timer = timer;
    if (typeof damageDuration === "number") this.damageDuration = damageDuration;
    if (typeof safeDuration === "number") this.safeDuration = safeDuration;
    this.updateVisual();
  }

  private updateVisual() {
    const key = this.damage ? "cable-on" : "cable-off";
    if (this.sprite.texture.key !== key) {
      this.sprite.setTexture(key);
    }
  }

  destroy(fromScene?: boolean) {
    this.sprite.destroy();
    super.destroy(fromScene);
  }
}
