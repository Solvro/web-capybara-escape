import { type, Schema, MapSchema } from "@colyseus/schema";
import { Position } from "./Position";

export class Door extends Schema {
  @type("string") id: string;
  @type("string") color: string;
  @type(Position) position: Position = new Position();
  @type("boolean") open: boolean = false;
}

export class DoorState extends Schema {
  @type({ map: Door }) doors = new MapSchema<Door>();

  createDoor(id: string, color: string, x: number, y: number): Door {
    const door = new Door();
    door.id = id;
    door.color = color;
    door.position.x = x;
    door.position.y = y;
    this.doors.set(id, door);
    return door;
  }

  setDoorState(id: string, open: boolean) {
    const door = this.doors.get(id);
    if (!door) return;
    door.open = open;
  }

  isOpenOrEmptyAt(x: number, y: number): boolean {
    for (const [, door] of this.doors) {
      if (door.position.x === x && door.position.y === y) {
        return door.open;
      }
    }
    return true;
  }

  onRoomDispose() {
    this.doors.clear();
  }
}
