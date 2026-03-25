import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE } from "../../constants/global";
import { Mechanic } from "./mechanic";

export class Wire extends Mechanic {
  public wireId: string;
  private direction:
    | "up"
    | "down"
    | "left"
    | "right"
    | "down-right"
    | "down-left"
    | "up-right"
    | "up-left"
    | "socket";

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    wireId: string,
    direction:
      | "up"
      | "down"
      | "left"
      | "right"
      | "down-right"
      | "down-left"
      | "up-right"
      | "up-left"
      | "socket",
  ) {
    const posY = y * CELL_SIZE + CELL_SIZE / 2;
    let FRAME = ASSETS.WIRE;
    if (direction.includes("-")) {
      FRAME = ASSETS.WIRE_CURVE;
    }
    if (direction === "socket") {
      FRAME = ASSETS.SOCKET;
    }
    super(scene, x, y, FRAME);
    this.wireId = wireId;
    this.direction = direction;

    switch (this.direction) {
      case "up":
        this.setAngle(270);
        break;
      case "up-right":
        this.setAngle(270);
        break;
      case "up-left":
        this.setAngle(180);
        break;
      case "right":
        this.setAngle(0);
        break;
      case "down-right":
        this.setAngle(0);
        break;
      case "down":
        this.setAngle(90);
        break;
      case "down-left":
        this.setAngle(90);
        break;
      case "left":
        this.setAngle(180);
        break;
      case "socket":
        this.setAngle(0);
        break;
    }

    this.setDepth(posY);
  }

  public get id(): string {
    return this.wireId;
  }
}
