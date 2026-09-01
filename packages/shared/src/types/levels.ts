import type { Position } from "./entities.js";

export type FormattedLevel = {
  maxClients: number;
  width: number;
  height: number;
  layout: string[][];
  mechanics: unknown[];
  entities: {
    players: Position[];
    enemies: Position[];
    crates: Position[];
    steelBoxes: Position[];
    vents: Array<Position & { open: boolean }>;
    capybara: Position;
  };
};

export type FormattedLevelType = FormattedLevel;

export type RoomJson = FormattedLevel | Record<string, unknown>;
