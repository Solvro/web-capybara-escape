import { type, Schema, ArraySchema } from "@colyseus/schema";
import { Position } from "./Position.js";
import { PlayerState } from "./PlayerState.js";
import { CrateState } from "./CrateState.js";
import { ButtonState } from "./ButtonState.js";
import { DoorState } from "./DoorState.js";
import { LaserState } from "./LaserState.js";

export class RoomState extends Schema {
  @type(["string"]) grid = new ArraySchema<string>();
  @type("number") width: number = 10;
  @type("number") height: number = 7;

  @type([Position]) startingPositions = new ArraySchema<Position>();

  @type(PlayerState) playerState: PlayerState = new PlayerState();
  @type(CrateState) crateState: CrateState = new CrateState();
  @type(DoorState) doorState: DoorState = new DoorState();
  @type(ButtonState) buttonState: ButtonState = new ButtonState();
  @type(LaserState) laserState: LaserState = new LaserState();

  loadRoomFromJson(jsonData: any) {
    try {
      this.width = jsonData.width;
      this.height = jsonData.height;

      this.grid = new ArraySchema<string>(...jsonData.layout);

      this._loadMechanics(jsonData.mechanics);

      for (const crateData of jsonData.entities.crates) {
        this.crateState.createCrate(crateData.x, crateData.y);
      }

      for (const playerData of jsonData.entities.players) {
        this.startingPositions.push(
          new Position().assign({ x: playerData.x, y: playerData.y })
        );
      }
    } catch (error) {
      throw `Error loading room data: ${error}`;
    }
  }

  _loadMechanics(mechanicsData: any) {
    for (const mechanicData of mechanicsData) {
      const mechanicType = mechanicData.type;

      if (mechanicType === "door") {
        this.doorState.createDoor(
          mechanicData.id,
          mechanicData.color,
          mechanicData.x,
          mechanicData.y
        );
      } else if (mechanicType === "button") {
        this.buttonState.createButton(
          mechanicData.id,
          mechanicData.color,
          mechanicData.x,
          mechanicData.y,
          mechanicData.doorId
        );
      } else if (mechanicType === "laser") {
        this.laserState.createLaser(
          mechanicData.id,
          mechanicData.x,
          mechanicData.y,
          mechanicData.direction,
          mechanicData.range ?? 10
        );
      }
    }
  }

  getCellValue(x: number, y: number): string {
    return this.grid[y * this.width + x];
  }

  getGridAs2DArray(): string[][] {
    const array2D: string[][] = [];

    for (let y = 0; y < this.height; y++) {
      const row: string[] = [];
      for (let x = 0; x < this.width; x++) {
        const cell = this.getCellValue(x, y);
        row.push(cell);
      }
      array2D.push(row);
    }
    return array2D;
  }

  isWalkableForPlayer(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return false;
    }
    return (
      this.getCellValue(x, y).startsWith("f") &&
      this.crateState.getCrateAt(x, y) === null &&
      this.doorState.isOpenOrEmptyAt(x, y)
    );
  }

  isWalkableForCrate(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;

    const cell = this.getCellValue(x, y);
    if (!cell.startsWith("f")) return false;

    const playerOccupies = [...this.playerState.players.values()].some(
      (p) => p.position.x === x && p.position.y === y
    );
    if (playerOccupies) return false;

    if (!this.doorState.isOpenOrEmptyAt(x, y)) return false;

    return true;
  }

  spawnNewPlayer(sessionId: string, name: string = null) {
    this.playerState.createPlayer(sessionId, name);
    const player = this.playerState.players.get(sessionId);
    const startingPos =
      this.startingPositions[player.index % this.startingPositions.length];
    player.position.x = startingPos.x;
    player.position.y = startingPos.y;
  }

  despawnPlayer(sessionId: string) {
    this.playerState.removePlayer(sessionId);
  }

  onRoomDispose() {
    this.playerState.onRoomDispose();
    this.crateState.onRoomDispose();
    this.doorState.onRoomDispose();
    this.buttonState.onRoomDispose();
    this.laserState.onRoomDispose();
  }

  movePlayer(sessionId: string, deltaX: number, deltaY: number): boolean {
    const player = this.playerState.players.get(sessionId);

    const newX = player.position.x + deltaX;
    const newY = player.position.y + deltaY;

    if (this.isWalkableForPlayer(newX, newY)) {
      player.position.x = newX;
      player.position.y = newY;
      return true;
    }

    const crate = this.crateState.getCrateAt(newX, newY);
    if (crate && this.moveCrate(crate.id, deltaX, deltaY)) {
      player.position.x = newX;
      player.position.y = newY;
      return true;
    }

    return false;
  }

  getMapInfo() {
    return {
      grid: this.getGridAs2DArray(),
      width: this.width,
      height: this.height,
      players: Array.from(this.playerState.players.values()).map((player) => {
        return {
          index: player.index,
          name: player.name,
          x: player.position.x,
          y: player.position.y,
          sessionId: player.sessionId,
        };
      }),
      crates: Array.from(this.crateState.crates.values()).map((crate) => {
        return {
          crateId: crate.id,
          x: crate.position.x,
          y: crate.position.y,
        };
      }),
      doors: Array.from(this.doorState.doors.values()).map((door) => ({
        doorId: door.id,
        color: door.color,
        x: door.position.x,
        y: door.position.y,
        open: door.open,
      })),
      buttons: Array.from(this.buttonState.buttons.values()).map((button) => ({
        buttonId: button.id,
        color: button.color,
        x: button.position.x,
        y: button.position.y,
        pressed: button.pressed,
      })),
      lasers: Array.from(this.laserState.lasers.values()).map((laser) => ({
        laserId: laser.id,
        x: laser.position.x,
        y: laser.position.y,
        direction: laser.direction,
        range: laser.range,
      })),
    };
  }

  getGrid() {
    return this.getGridAs2DArray();
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getPlayerName(sessionId: string): string {
    return this.playerState.getPlayerName(sessionId);
  }

  despawnCrate(id: string) {
    this.crateState.removeCrate(id);
  }

  moveCrate(crateId: string, dx: number, dy: number): boolean {
    const crate = this.crateState.crates.get(crateId);
    if (!crate) return false;

    const targetX = crate.position.x + dx;
    const targetY = crate.position.y + dy;

    if (!this.isWalkableForCrate(targetX, targetY)) return false;

    const nextCrate = this.crateState.getCrateAt(targetX, targetY);
    if (nextCrate && !this.moveCrate(nextCrate.id, dx, dy)) return false;

    const oldX = crate.position.x;
    const oldY = crate.position.y;

    this.crateState.moveCratesBlock(oldX, oldY, targetX, targetY, dx, dy);

    crate.position.x = targetX;
    crate.position.y = targetY;

    return true;
  }

  checkButtonPressed() {
    const doorsAndButtonsToUpdate: {
      doorId: string;
      buttonId: string;
      open: boolean;
    }[] = [];

    for (const button of this.buttonState.buttons.values()) {
      const playerOnButton = [...this.playerState.players.values()].some(
        (p) =>
          p.position.x === button.position.x &&
          p.position.y === button.position.y
      );

      const crateOnButton = !!this.crateState.getCrateAt(
        button.position.x,
        button.position.y
      );

      const door = this.doorState.doors.get(button.doorId);
      if (!door) return;

      const shouldOpen = playerOnButton || crateOnButton;
      if (door.open !== shouldOpen) {
        door.open = shouldOpen;
        button.pressed = shouldOpen;
        doorsAndButtonsToUpdate.push({
          doorId: door.id,
          buttonId: button.id,
          open: door.open,
        });
      }
    }
    return doorsAndButtonsToUpdate;
  }

  fireLaser(laserId: string): {
    active: boolean;
    path: { x: number; y: number }[];
    cratesDestroyed: { crateId: string; x: number; y: number }[];
  } {
    const laser = this.laserState.getLaser(laserId);
    if (!laser) {
      return { active: false, path: [], cratesDestroyed: [] };
    }

    // Toggle the laser active state
    laser.active = !laser.active;

    // If turning off, return empty path
    if (!laser.active) {
      return { active: false, path: [], cratesDestroyed: [] };
    }

    const path: { x: number; y: number }[] = [];
    const cratesDestroyed: { crateId: string; x: number; y: number }[] = [];

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

    let currentX = laser.position.x + dx;
    let currentY = laser.position.y + dy;

    for (let i = 0; i < laser.range; i++) {
      // Stop if out of bounds
      if (
        currentX < 0 ||
        currentX >= this.width ||
        currentY < 0 ||
        currentY >= this.height
      ) {
        break;
      }

      // Stop if hit a wall
      const cell = this.getCellValue(currentX, currentY);
      if (cell.startsWith("w")) {
        break;
      }

      path.push({ x: currentX, y: currentY });

      // Check for crate at this position and destroy it
      const crate = this.crateState.getCrateAt(currentX, currentY);
      if (crate) {
        cratesDestroyed.push({
          crateId: crate.id,
          x: currentX,
          y: currentY,
        });
        this.crateState.removeCrate(crate.id);
      }

      currentX += dx;
      currentY += dy;
    }

    return { active: true, path, cratesDestroyed };
  }
}
