import type { Button } from "../types/button";
import type { Crate } from "../types/crate";
import type { Door } from "../types/door";
import type { Laser } from "../types/laser";
import type { Player } from "../types/player";

export interface MessageMapInfo {
  grid: string[][];
  width: number;
  height: number;
  players: Player[];
  crates: Crate[];
  doors: Door[];
  buttons: Button[];
  lasers: Laser[];
}

export interface MessageCratesUpdate {
  crates: { crateId: number; direction: "left" | "right" | "up" | "down" }[];
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
