import { MapSchema, Schema, type } from "@colyseus/schema";

import { Position } from "./position";

export class Laser extends Schema {
  @type("string") id: string;
  @type(Position) position: Position = new Position();
  @type("string") direction: string;
  @type("number") maxRange: number = 10;
  @type("boolean") active: boolean = false;
  @type("string") color: string = "#FF0000";
  @type("number") activeDuration: number = 1000;
  @type("number") inactiveDuration: number = 1000;
  @type("number") delay: number = 0;
  @type("number") currentRange: number = 0;

  private timeSinceStateChange: number = 0;
  private isWaitingDelay: boolean = true;

  update(deltaTime: number) {
    this.timeSinceStateChange += deltaTime;

    if (this.isWaitingDelay) {
      if (this.delay > 0) {
        if (this.timeSinceStateChange >= this.delay) {
          this.isWaitingDelay = false;
          this.active = true;
          this.timeSinceStateChange = 0;
          this.currentRange = this.maxRange;
        }
        return;
      } else {
        this.isWaitingDelay = false;
        this.timeSinceStateChange = 0;
      }
    }

    const duration = this.active ? this.activeDuration : this.inactiveDuration;

    if (this.timeSinceStateChange >= duration) {
      this.active = !this.active;
      this.currentRange = this.active ? this.maxRange : 0;
      this.timeSinceStateChange = 0;
    }
  }
}

export class LaserState extends Schema {
  @type({ map: Laser }) lasers = new MapSchema<Laser>();
  @type({ map: "string" }) positionMap = new MapSchema<string>();

  createLaser(
    id: string,
    color: string,
    x: number,
    y: number,
    direction: string,
    range: number = 10,
    activeDuration: number = 1000,
    inactiveDuration: number = 1000,
    delay: number = 0,
  ): Laser {
    const laser = new Laser();
    laser.id = id;
    laser.color = color;
    laser.position.x = x;
    laser.position.y = y;
    laser.direction = direction;
    laser.maxRange = range;
    laser.active = false;
    laser.currentRange = 0;
    laser.activeDuration = activeDuration;
    laser.inactiveDuration = inactiveDuration;
    laser.delay = delay;
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

  public isPointInLaserBeam(x: number, y: number): boolean {
    for (const laser of this.lasers.values()) {
      if (!laser.active) continue;

      let dx = 0;
      let dy = 0;

      switch (laser.direction) {
        case "up":
          dy = -1;
          break;
        case "down":
          dy = 1;
          break;
        case "left":
          dx = -1;
          break;
        case "right":
          dx = 1;
          break;
      }

      for (let i = 1; i <= laser.currentRange; i++) {
        const beamX = laser.position.x + dx * i;
        const beamY = laser.position.y + dy * i;

        if (beamX === x && beamY === y) {
          return true;
        }
      }
    }

    return false;
  }

  onRoomDispose() {
    this.lasers.clear();
    this.positionMap.clear();
  }

  clear() {
    this.lasers.clear();
    this.positionMap.clear();
  }
}
