import type { Direction } from "./direction.js";
import type {
  Button,
  Cable,
  Capybara,
  Crate,
  Door,
  Enemy,
  Laser,
  Player,
  Vent,
  Wire,
} from "./entities.js";

export const ClientMessageType = {
  Move: "move",
  GetMapInfo: "getMapInfo",
  GenerateLine: "generateLine",
  Reset: "reset",
  TogglePause: "togglePause",
  NextScreen: "nextScreen",
  EndDemo: "endDemo",
} as const;

export type ClientMessageType =
  (typeof ClientMessageType)[keyof typeof ClientMessageType];

export const ServerMessageType = {
  MapInfo: "mapInfo",
  OnAddPlayer: "onAddPlayer",
  OnRemovePlayer: "onRemovePlayer",
  PositionUpdate: "positionUpdate",
  CratesUpdate: "cratesUpdate",
  LasersUpdated: "lasersUpdated",
  DoorsAndButtonsUpdate: "doorsAndButtonsUpdate",
  CablesUpdate: "cablesUpdate",
  CapybaraUpdate: "capybaraUpdate",
  EnemyUpdate: "enemyUpdate",
  PlayerDamaged: "playerDamaged",
  Line: "line",
  RoomReset: "roomReset",
  PauseToggled: "pauseToggled",
  GameOver: "gameOver",
  LevelComplete: "levelComplete",
  DemoCompleted: "demoCompleted",
  DemoEnded: "demoEnded",
} as const;

export type ServerMessageType =
  (typeof ServerMessageType)[keyof typeof ServerMessageType];

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
  crates: { crateId: number; direction: Direction }[];
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
  doorsAndButtons: {
    doorId?: string;
    buttonId?: string;
    open?: boolean;
    pressed?: boolean;
  }[];
}

export interface MessagePositionUpdate {
  sessionId: string;
  direction: Direction;
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

export interface MessageCapybaraUpdate {
  x: number;
  y: number;
  state: string;
}

export interface MessagePlayerDamaged {
  sessionId: string;
}

export interface MessageRoomReset {
  message: string;
  mapInfo: MessageMapInfo;
}

export interface MessagePauseToggled {
  isPaused: boolean;
}

export interface MessageGameOver {
  message: string;
}

export interface MessageLevelComplete {
  message: string;
  screenIndex?: number;
  totalScreens?: number;
}

export interface MessageDemoCompleted {
  message: string;
}

export interface MessageDemoEnded {
  message: string;
}

export interface MessageMove {
  direction: Direction;
}
