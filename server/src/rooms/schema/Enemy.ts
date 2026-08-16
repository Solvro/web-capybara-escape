import { Schema, type } from "@colyseus/schema";

import { Position } from "./Position";

export class Enemy extends Schema {
  @type("number") id: number;
  @type(Position) position: Position;
  @type("string") state: string;

  constructor(x: number, y: number, id: number, state: string = "idle") {
    super();
    this.id = id;
    this.position = new Position();
    this.position.x = x;
    this.position.y = y;
    this.state = state;
  }
}
