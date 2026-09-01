import type { Direction, WireDirection } from "./direction";

export type Position = {
  x: number;
  y: number;
};

export interface Player {
  name: string;
  x: number;
  y: number;
  index: number;
  sessionId: string;
  isLocal?: boolean;
}

export interface Crate {
  x: number;
  y: number;
  crateId: number;
  isSteel: boolean;
}

export interface Enemy {
  id: number;
  x: number;
  y: number;
  state: string;
}

export interface Capybara {
  x: number;
  y: number;
  state: string;
}

export interface Door {
  doorId: string;
  color: string;
  x: number;
  y: number;
  open: boolean;
}

export interface Button {
  x: number;
  y: number;
  buttonId: string;
  color: string;
  pressed: boolean;
}

export interface Laser {
  laserId: string;
  color: string;
  x: number;
  y: number;
  direction: Direction;
  range: number;
  active: boolean;
}

export interface Cable {
  cableId: string;
  x: number;
  y: number;
  damage: boolean;
  timer: number;
  direction: Direction;
  damageDuration: number;
  safeDuration: number;
}

export interface Wire {
  wireId: string;
  x: number;
  y: number;
  direction: WireDirection;
}

export interface Vent {
  id: number;
  x: number;
  y: number;
  open: boolean;
}
