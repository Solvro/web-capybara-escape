import { type, Schema, MapSchema } from "@colyseus/schema";
import { Position } from "./Position";

export class Laser extends Schema {
  @type("string") id: string;
  @type(Position) position: Position = new Position();
  @type("string") direction: string; // "up", "down", "left", "right"
  @type("number") range: number = 10;
  @type("boolean") active: boolean = false;
}

export class LaserState extends Schema {
  @type({ map: Laser }) lasers = new MapSchema<Laser>();
  @type({ map: "string" }) positionMap = new MapSchema<string>(); // key: "x_y", value: laserId

  createLaser(
    id: string,
    x: number,
    y: number,
    direction: string,
    range: number = 10
  ): Laser {
    const laser = new Laser();
    laser.id = id;
    laser.position.x = x;
    laser.position.y = y;
    laser.direction = direction;
    laser.range = range;
    laser.active = false;
    this.lasers.set(id, laser);
    this.positionMap.set(`${x}_${y}`, id);
    return laser;
  }

  getLaserAt(x: number, y: number): Laser | undefined {
    const laserId = this.positionMap.get(`${x}_${y}`);
    return laserId ? this.lasers.get(laserId) : undefined;
  }

  getLaser(id: string): Laser | undefined {
    return this.lasers.get(id);
  }

  removeLaser(id: string) {
    const laser = this.lasers.get(id);
    if (laser) {
      this.positionMap.delete(`${laser.position.x}_${laser.position.y}`);
      this.lasers.delete(id);
    }
  }

  onRoomDispose() {
    this.lasers.clear();
    this.positionMap.clear();
  }
}
