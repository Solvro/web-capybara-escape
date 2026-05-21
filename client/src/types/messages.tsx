import type { Button } from "../types/button";
import type { Cable } from "../types/cable";
import type { Capybara } from "../types/capybara";
import type { Crate } from "../types/crate";
import type { Door } from "../types/door";
import type { Laser } from "../types/laser";
import type { Player } from "../types/player";
import type { Vent } from "../types/vent";
import type { Wire } from "../types/wire";

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
