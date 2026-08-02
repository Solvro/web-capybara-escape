import type { Button } from "./button";
import type { Cable } from "./cable";
import type { Capybara } from "./capybara";
import type { Crate } from "./crate";
import type { Door } from "./door";
import type { Enemy } from "./enemy";
import type { Laser } from "./laser";
import type { Player } from "./player";
import type { Vent } from "./vent";
import type { Wire } from "./wire";

export interface MessageMapInfo {
  grid: string[][];
  width: number;
  height: number;
  isPaused: boolean;
  players: Player[];
  crates: Crate[];
  doors: Door[];
  buttons: Button[];
  lasers: Laser[];
  cables: Cable[];
  wires: Wire[];
  vents: Vent[];
  capybara: Capybara;
  enemies: Enemy[];
}

export interface MessageEnemyUpdate {
  id: number;
  x: number;
  y: number;
  state: string;
}

export interface MessageCratesUpdate {
  crates: { crateId: number; direction: "left" | "right" | "up" | "down" }[];
}

export interface MessageCablesUpdate {
  cables: Cable[];
}

export interface MessageLasersUpdate {
  lasers: {
    laserId: string;
    active: boolean;
    cratesDestroyed: Crate[];
    range: number;
  }[];
}

export interface MessageDoorsAndButtonsUpdate {
  doorsAndButtons: { doorId: string; buttonId: string; open: boolean }[];
}

export interface MessagePositionUpdate {
  sessionId: string;
  direction: "left" | "right" | "up" | "down";
}

export interface MessageOnAddPlayer {
  sessionId: string;
  playerName: string;
  position: { x: number; y: number };
  index: number;
}

export interface MessageOnRemovePlayer {
  sessionId: string;
}

export interface MessageGenerateLines {
  sessionId: string;
  text: string;
}

export interface MessageRoomReset {
  message: string;
  timestamp: number;
}

export interface MessagePauseToggled {
  isPaused: boolean;
}
