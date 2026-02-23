import { Schema, type } from "@colyseus/schema";
import { Position } from "./Position";

export class Capybara extends Schema {
    @type("number") id: number;
    @type(Position) position: Position;
    @type("string") state: string;

    constructor(x: number, y: number, state: string = "idle") {
        super();
        this.position = new Position()
        this.position.x = x;
        this.position.y = y;
        this.state = state;
  }
}