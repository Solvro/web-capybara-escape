import { Schema, type } from "@colyseus/schema";

import { Position } from "./position";

export class Player extends Schema {
  @type("string") sessionId: string;
  @type("number") index: number;
  @type("string") name: string;
  @type(Position) position: Position;
}
