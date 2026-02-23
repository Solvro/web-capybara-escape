import { Schema, type, MapSchema, SetSchema } from "@colyseus/schema";
import { Player } from "./Player";
import { Position } from "./Position";

export class PlayerState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();
  @type({ map: "string" })
  playerSessionIds = new MapSchema<string>();
  @type({ set: "string" })
  currentNames = new SetSchema<string>();
  @type({ set: "number" })
  usedIndices = new SetSchema<number>();

  createNewName(name: string = null): string {
    if (!name) {
      name = "Anonymous";
    }

    let uniqueName = name.toUpperCase();
    let counter = 1;

    while (this.currentNames.has(uniqueName)) {
      uniqueName = `${name}${counter}`;
      counter++;
    }

    this.currentNames.add(uniqueName);
    return uniqueName;
  }

  createPlayer(sessionId: string, name: string = null) {
    const player = new Player();
    const pos = new Position();
    player.position = pos;
    player.sessionId = sessionId;
    let index = 0;
    while (this.usedIndices.has(index)) {
      index++;
    }
    console.log("Assigning index:", index);
    this.usedIndices.add(index);
    player.index = index;
    player.name = this.createNewName(name);
    this.players.set(sessionId, player);
    this.playerSessionIds.set(player.name, sessionId);
  }

  removePlayer(sessionId: string) {
    this.usedIndices.delete(this.players.get(sessionId).index);
    this.currentNames.delete(this.players.get(sessionId).name);
    this.playerSessionIds.delete(this.players.get(sessionId).name);
    this.players.delete(sessionId);
  }

  onRoomDispose() {
    this.players.clear();
    this.playerSessionIds.clear();
    this.currentNames.clear();
  }

  getPlayerName(sessionId: string): string {
    return this.players.get(sessionId).name;
  }

  getSessionIdByName(name: string): string | null {
    return this.playerSessionIds.get(name) || null;
  }
}
