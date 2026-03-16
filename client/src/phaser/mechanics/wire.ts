import { Mechanic } from "./mechanic";

const WIRE_FRAME = 24;

export class Wire extends Mechanic {
  public wireId: string;
  private direction: "up" | "down" | "left" | "right";

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    wireId: string,
    direction: "up" | "down" | "left" | "right",
  ) {
    super(scene, x, y, WIRE_FRAME);
    this.wireId = wireId;
    this.direction = direction;

    switch (this.direction) {
      case "up":
        this.setAngle(270);
        break;
      case "right":
        this.setAngle(0);
        break;
      case "down":
        this.setAngle(90);
        break;
      case "left":
        this.setAngle(180);
        break;
    }
  }

  public get id(): string {
    return this.wireId;
  }
}
