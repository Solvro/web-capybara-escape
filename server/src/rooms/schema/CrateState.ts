import { type, Schema, MapSchema, SetSchema } from "@colyseus/schema";
import { Position } from "./Position";
import type { Direction } from "../../shared/utils/vectorUtils";
import { getDirectionFromMoveVector } from "../../shared/utils/vectorUtils";

export class Crate extends Schema {
  @type("string") id: string;
  @type(Position) position: Position;
}

export class CrateState extends Schema {
  @type({ map: Crate })
  crates = new MapSchema<Crate>();

  private usedIds = new Set<number>();
  private nextAvailableId: number = 0;

  private positionToCrateId = new Map<string, string>(); // key: "x_y", value: crateId
  private movedCrateIds = new Set<string>();
  private movedCrateDirections = new Map<string, Direction>(); // key: crateId, value: direction

  private getPositionKey(x: number, y: number): string {
    return `${x}_${y}`;
  }

  createCrate(x: number, y: number): Crate {
    const id = this.nextAvailableId++;
    this.usedIds.add(id);

    const crate = new Crate();
    crate.id = id.toString();
    crate.position = new Position();
    crate.position.x = x;
    crate.position.y = y;

    this.crates.set(crate.id, crate);

    const key = this.getPositionKey(x, y);
    this.positionToCrateId.set(key, crate.id);

    return crate;
  }

  removeCrate(id: string) {
    const crate = this.crates.get(id);
    if (!crate) return;

    const key = this.getPositionKey(crate.position.x, crate.position.y);
    this.positionToCrateId.delete(key);

    this.crates.delete(id);
  }

  onRoomDispose() {
    this.crates.clear();
    this.usedIds.clear();
  }

  getCrateAt(x: number, y: number) {
    const key = this.getPositionKey(x, y);
    const crateId = this.positionToCrateId.get(key);
    return crateId ? this.crates.get(crateId) : null;
  }

  moveCrateIndex(
    crate: Crate,
    oldX: number,
    oldY: number,
    dx: number,
    dy: number
  ) {
    const oldKey = this.getPositionKey(oldX, oldY);
    this.positionToCrateId.delete(oldKey); // delete old mapping

    this.movedCrateIds.add(crate.id);
    this.movedCrateDirections.set(crate.id, getDirectionFromMoveVector(dx, dy));

    const newKey = this.getPositionKey(oldX + dx, oldY + dy);
    this.positionToCrateId.set(newKey, crate.id); // add new mapping to crate
  }

  moveCratesBlock(
    oldX: number,
    oldY: number,
    targetX: number,
    targetY: number,
    dx: number,
    dy: number
  ): boolean {
    while (oldX !== targetX || oldY !== targetY) {
      targetX -= dx;
      targetY -= dy;
      const crate = this.getCrateAt(targetX, targetY);
      if (!crate) return false;
      this.moveCrateIndex(crate, targetX, targetY, dx, dy);
    }
    return true;
  }

  getAndClearMovedCrates(): Crate[] {
    const movedCrates: any = [];

    this.movedCrateIds.forEach((crateId) => {
      const crateDirection = this.movedCrateDirections.get(crateId);
      if (crateDirection) {
        movedCrates.push({
          crateId: crateId,
          direction: crateDirection,
        });
      }
    });

    this.movedCrateIds.clear();
    this.movedCrateDirections.clear();

    return movedCrates;
  }
}
