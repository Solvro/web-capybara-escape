import * as Phaser from "phaser";
import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";
import { Mechanic } from "./mechanic";

const CABLE_FRAME_ON = 25; 
const CABLE_FRAME_OFF = 24; 

export class Cable extends Mechanic {
  public cableId: string;
  public damage: boolean;
  public timer: number;
  public damageDuration: number;
  public safeDuration: number;
  public direction: "up" | "down" | "left" | "right";

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    id: number,
    damaged: boolean,
    timer: number,
    damageDuration: number,
    safeDuration: number,
    direction: string,
  ) {
    const posX = x * CELL_SIZE + CELL_SIZE / 2;
    const posY = y * CELL_SIZE + CELL_SIZE / 2;


    super(scene, x, y, damaged ? CABLE_FRAME_ON : CABLE_FRAME_OFF);

    this.cableId = id.toString();
    this.damage = damaged;
    this.timer = timer;
    this.damageDuration = damageDuration;
    this.safeDuration = safeDuration;
    this.direction = direction as any;



    switch (this.direction) {
      case "up":
        this.setAngle(0);
        break;
      case "right":
        this.setAngle(90);
        break;
      case "down":
        this.setAngle(180);
        break;
      case "left":
        this.setAngle(270);
        break;
    }

    this.setDepth(posY);


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
    const frame = this.damage ? CABLE_FRAME_ON : CABLE_FRAME_OFF;
    if ((this as any).setFrame) {
      this.setFrame(frame);
    }
  }

  destroy(fromScene?: boolean) {
    super.destroy(fromScene);
  }
}
