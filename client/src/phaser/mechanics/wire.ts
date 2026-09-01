import type { Wire as WireType } from "@capybara/shared";
import type { WireDirection } from "@capybara/shared";
import * as Phaser from "phaser";

import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE } from "../../constants/global";
import type { INetworkInterface } from "../../types/network-interface";
import { Mechanic } from "./mechanic";

export class Wire extends Mechanic implements INetworkInterface<WireType> {
  public wireId: string;
  public networkId: string;
  private direction: WireDirection;

  constructor(scene: Phaser.Scene, data: WireType) {
    const { x, y, wireId, direction } = data;
    const posY = y * CELL_SIZE + CELL_SIZE / 2;
    let FRAME = ASSETS.WIRE;
    if (direction.includes("-")) {
      FRAME = ASSETS.WIRE_CURVE;
    }
    if (direction === "socket") {
      FRAME = ASSETS.SOCKET;
    }
    super(scene, x, y, FRAME);
    this.networkId = data.wireId;
    this.wireId = wireId;
    this.direction = direction;

    switch (this.direction) {
      case "up": {
        this.setAngle(270);
        break;
      }
      case "up-right": {
        this.setAngle(270);
        break;
      }
      case "up-left": {
        this.setAngle(180);
        break;
      }

      case "right": {
        this.setAngle(0);
        break;
      }
      case "down-right": {
        this.setAngle(0);
        break;
      }
      case "down": {
        this.setAngle(90);
        break;
      }
      case "down-left": {
        this.setAngle(90);
        break;
      }
      case "left": {
        this.setAngle(180);
        break;
      }
      case "socket": {
        this.setAngle(0);
        break;
      }
    }

    this.setDepth(posY);
  }

  public syncState(_: WireType) {
    // Wire state is static, so no need to implement this method
  }

  public get id(): string {
    return this.wireId;
  }
}
