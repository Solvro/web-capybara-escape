import { type, Schema } from "@colyseus/schema";
import { Position } from "./Position";

export class Player extends Schema {
  @type("string") sessionId: string;
  @type("number") index: number;
  @type("string") name: string;
  @type(Position) position: Position;
}
