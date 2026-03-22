import { type, Schema, ArraySchema } from "@colyseus/schema";
import { Position } from "./Position.js";
import { PlayerState } from "./PlayerState.js";
import { CrateState } from "./CrateState.js";
import { ButtonState } from "./ButtonState.js";
import { DoorState } from "./DoorState.js";
import { LaserState } from "./LaserState.js";
import { CableState } from "./CableState.js";
import { WireState } from "./WireState.js";
import { VentState } from "./VentState.js";
import { Capybara } from "./Capybara.js";


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
  @type(CableState) cableState: CableState = new CableState();
  @type(WireState) wireState: WireState = new WireState();
  @type(VentState) ventState: VentState = new VentState();
  @type(Capybara) capybara: Capybara;

  private capybaraPath: { x: number; y: number }[] = [];

  loadRoomFromJson(jsonData: any) {
    try {
      this.width = jsonData.width;
      this.height = jsonData.height;

      this.grid = new ArraySchema<string>(...jsonData.layout.flat());

      this._loadMechanics(jsonData.mechanics);

      for (const crateData of jsonData.entities.crates) {
        this.crateState.createCrate(crateData.x, crateData.y);
      }

      for (const playerData of jsonData.entities.players) {
        this.startingPositions.push(
          new Position().assign({ x: playerData.x, y: playerData.y }),
        );
      }
      for (const ventData of jsonData.entities.vents ?? []) {
        this.ventState.createVent(ventData.x, ventData.y, !!ventData.open);
      }

      if (jsonData.entities.capybara) {
        const { x, y } = jsonData.entities.capybara;
        this.capybara = new Capybara(x, y);
      }
    } catch (error) {
      throw `Error loading room data: ${error} `;
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
          mechanicData.y,
        );
      } else if (mechanicType === "button") {
        this.buttonState.createButton(
          mechanicData.id,
          mechanicData.color,
          mechanicData.x,
          mechanicData.y,
          mechanicData.doorId,
        );
      } else if (mechanicType === "laser") {
        this.laserState.createLaser(
          mechanicData.id,
          mechanicData.color,
          mechanicData.x,
          mechanicData.y,
          mechanicData.direction,
          mechanicData.range ?? 10,
          mechanicData.activeDuration ?? 1000,
          mechanicData.inactiveDuration ?? 1000,
          mechanicData.delay ?? 0,
        );
      } else if (mechanicType === "cable") {
        // pass mechanic id so cable uses same id defined in room JSON 
        this.cableState.createCable(
          mechanicData.id,
          mechanicData.x,
          mechanicData.y,
          mechanicData.direction,
          mechanicData.damageMs ?? mechanicData.damage,
          mechanicData.safeMs ?? mechanicData.safeDuration,
          mechanicData.startDamaging ?? mechanicData.startDamage ?? false,
        );
      }
        else if (mechanicType === "wire"){
        this.wireState.createWire(
          mechanicData.id,
          mechanicData.x,
          mechanicData.y,
          mechanicData.direction,
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
      (p) => p.position.x === x && p.position.y === y,
    );
    if (playerOccupies) return false;

    if (!this.doorState.isOpenOrEmptyAt(x, y)) return false;

    return true;
  }

  isWalkableForCapybara(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;

    const cell = this.getCellValue(x, y);

    if (cell.startsWith("w")) return false;

    if (this.crateState.getCrateAt(x, y)) return false;

    if (!this.doorState.isOpenOrEmptyAt(x, y)) return false;

    return true;
  }

  reconstructPath(
    parents: Map<string, { x: number; y: number }>,
    endNode: { x: number; y: number },
  ): { x: number; y: number }[] {
    const path = [endNode];
    let current = endNode;
    let parent = parents.get(`${current.x}_${current.y}`);

    while (parent) {
      current = parent;
      const key = `${current.x}_${current.y}`;
      parent = parents.get(key);
      path.push(current);
    }

    return path.reverse();
  }

  findPathToVent(): { x: number; y: number }[] | null {
    const startNode = {
      x: this.capybara.position.x,
      y: this.capybara.position.y,
    };

    const queue: { x: number; y: number }[] = [];
    queue.push(startNode);

    const visited = new Set<string>();
    visited.add(`${startNode.x}_${startNode.y}`);

    const parents = new Map<string, { x: number; y: number }>();
    const delta = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
    ];

    while (!(queue.length === 0)) {
      let current = queue.shift()!;
      if (
        this.ventState.getVentAt(current.x, current.y) &&
        this.ventState.isOpenOrEmptyAt(current.x, current.y)
      ) {
        return this.reconstructPath(parents, current);
      }

      for (const nextMove of delta) {
        let [nextX, nextY] = [current.x + nextMove.x, current.y + nextMove.y];
        let nextKey: string = `${nextX}_${nextY}`;
        if (visited.has(nextKey)) continue;
        if (!this.isWalkableForCapybara(nextX, nextY)) continue;
        if (!this.ventState.isOpenOrEmptyAt(nextX, nextY)) continue;

        visited.add(nextKey);
        parents.set(nextKey, current);
        queue.push({ x: nextX, y: nextY });
      }
    }
    // console.log("no possible way :(")
    return null;
  }

  updateCapybara() {
    if (!this.capybara) return;

    if (this.capybaraPath.length === 0) {
      const path = this.findPathToVent();

      if (path && path.length > 1) {
        path.shift();
        this.capybaraPath = path;
      }
    }

    if (this.capybaraPath.length > 0) {
      const nextStep = this.capybaraPath.shift();

      if (nextStep) {
        if (
          !this.isWalkableForCapybara(nextStep.x, nextStep.y) ||
          !this.ventState.isOpenOrEmptyAt(nextStep.x, nextStep.y)
        ) {
          this.capybaraPath = [];
          return;
        }

        this.capybara.position.x = nextStep.x;
        this.capybara.position.y = nextStep.y;
        this.capybara.state = "run";
      }
    } else {
      this.capybara.state = "idle";
    }
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
    this.cableState.onRoomDispose();
    this.wireState.onRoomDispose();
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

  updateLasers(deltaTime: number) {
    let results = [];
    for (const laser of this.laserState.lasers.values()) {
      const prevActive = laser.active;
      laser.update(deltaTime);

      if (prevActive !== laser.active) {
        const result = this.fireLaser(laser.id);
        results.push(result);
      }
    }
    return results;
  }

  fireLaser(laserId: string): {
    laserId: string;
    active: boolean;
    cratesDestroyed: { crateId: string; x: number; y: number }[];
    range: number;
  } {
    const laser = this.laserState.getLaser(laserId);
    if (!laser) {
      return { laserId, active: false, cratesDestroyed: [], range: 0 };
    }

    // If turning off, return empty path
    if (!laser.active) {
      return { laserId, active: false, cratesDestroyed: [], range: 0 };
    }

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

    let range = 0;
    for (let i = 0; i < laser.maxRange; i++) {
      // Stop if out of bounds
      if (
        currentX < 0 ||
        currentX >= this.width ||
        currentY < 0 ||
        currentY >= this.height
      ) {
        range = i;
        break;
      }

      // Stop if hit a wall
      const cell = this.getCellValue(currentX, currentY);
      if (cell === undefined || cell.startsWith("w")) {
        range = i;
        break;
      }

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

    return { laserId, active: true, cratesDestroyed, range };
  }

  spawnCapybara() {
    const startingPos = new Position();
    startingPos.x = 3;
    startingPos.y = 4;
    this.capybara = new Capybara(startingPos.x, startingPos.y);
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
      cables: Array.from(this.cableState.cables.values()).map((cable) => {
        return {
          cableId: cable.id,
          x: cable.position.x,
          y: cable.position.y,
          direction: cable.direction,
          damage: cable.damage,
          damageDuration: cable.damageDuration,
          safeDuration: cable.safeDuration,
          timer: cable.timer,
        };
      }),
      wires: Array.from(this.wireState.wires.values()).map((wire) =>{
        return {
          wireId: wire.id,
          x: wire.position.x,
          y: wire.position.y,
          direction: wire.direction,
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
        color: laser.color,
        x: laser.position.x,
        y: laser.position.y,
        direction: laser.direction,
        range: laser.maxRange,
      })),
      vents: Array.from(this.ventState.vents.values()).map((vent) => ({
        id: vent.id,
        x: vent.position.x,
        y: vent.position.y,
        open: vent.open,
      })),
      capybara: this.capybara
        ? {
            x: this.capybara.position.x,
            y: this.capybara.position.y,
            state: this.capybara.state,
          }
        : null,
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

  

  // expose toggles/moves for broadcasting
  getAndClearToggledCables() {
    return this.cableState.getAndClearToggledCables();
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
          p.position.y === button.position.y,
      );

      const crateOnButton = !!this.crateState.getCrateAt(
        button.position.x,
        button.position.y,
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
}
