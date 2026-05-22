import { MapSchema, Schema, SetSchema, type } from "@colyseus/schema";

import type { Direction } from "../../shared/utils/vectorUtils";
import { getDirectionFromMoveVector } from "../../shared/utils/vectorUtils";
import { Position } from "./Position";

export class SteelBox extends Schema {
  @type("string") id: string;
  @type(Position) position: Position;
}

export class SteelBoxState extends Schema {
  @type({ map: SteelBox })
  steelBoxes = new MapSchema<SteelBox>();

  private usedIds = new Set<number>();
  private nextAvailableId: number = 0;

  private positionToSteelBoxId = new Map<string, string>(); // key: "x_y", value: crateId
  private movedSteelBoxIds = new Set<string>();
  private movedSteelBoxDirections = new Map<string, Direction>(); // key: crateId, value: direction

  private getPositionKey(x: number, y: number): string {
    return `${x}_${y}`;
  }

  createSteelBox(x: number, y: number): SteelBox {
    const id = this.nextAvailableId++;
    this.usedIds.add(id);

    const steelBox = new SteelBox();
    steelBox.id = id.toString();
    steelBox.position = new Position();
    steelBox.position.x = x;
    steelBox.position.y = y;

    this.steelBoxes.set(steelBox.id, steelBox);

    const key = this.getPositionKey(x, y);
    this.positionToSteelBoxId.set(key, steelBox.id);

    return steelBox;
  }

  removeSteelBox(id: string) {
    const steelBox = this.steelBoxes.get(id);
    if (!steelBox) return;

    const key = this.getPositionKey(steelBox.position.x, steelBox.position.y);
    this.positionToSteelBoxId.delete(key);

    this.steelBoxes.delete(id);
  }

  onRoomDispose() {
    this.steelBoxes.clear();
    this.usedIds.clear();
  }

  getSteelBoxAt(x: number, y: number) {
    const key = this.getPositionKey(x, y);
    const steelBoxId = this.positionToSteelBoxId.get(key);
    return steelBoxId ? this.steelBoxes.get(steelBoxId) : null;
  }

  moveSteelBoxIndex(
    steelBox: SteelBox,
    oldX: number,
    oldY: number,
    dx: number,
    dy: number,
  ) {
    const oldKey = this.getPositionKey(oldX, oldY);
    this.positionToSteelBoxId.delete(oldKey); // delete old mapping

    this.movedSteelBoxIds.add(steelBox.id);
    this.movedSteelBoxDirections.set(
      steelBox.id,
      getDirectionFromMoveVector(dx, dy),
    );

    const newKey = this.getPositionKey(oldX + dx, oldY + dy);
    this.positionToSteelBoxId.set(newKey, steelBox.id); // add new mapping to crate
  }

  moveSteelBoxBlock(
    oldX: number,
    oldY: number,
    targetX: number,
    targetY: number,
    dx: number,
    dy: number,
  ): boolean {
    while (oldX !== targetX || oldY !== targetY) {
      targetX -= dx;
      targetY -= dy;
      const steelBox = this.getSteelBoxAt(targetX, targetY);
      if (!steelBox) return false;
      this.moveSteelBoxIndex(steelBox, targetX, targetY, dx, dy);
    }
    return true;
  }

  getAndClearMovedSteelBoxes(): SteelBox[] {
    const movedSteelBoxes: any = [];

    this.movedSteelBoxIds.forEach((steelBoxId) => {
      const steelBoxDirection = this.movedSteelBoxDirections.get(steelBoxId);
      if (steelBoxDirection) {
        movedSteelBoxes.push({
          steelBoxId: steelBoxId,
          direction: steelBoxDirection,
        });
      }
    });

    this.movedSteelBoxIds.clear();
    this.movedSteelBoxDirections.clear();

    return movedSteelBoxes;
  }
}
