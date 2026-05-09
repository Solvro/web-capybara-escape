export const SIZE_MULTIPLIER = 5;

export const TILE_SIZE = 24;
export const CELL_SIZE = TILE_SIZE * SIZE_MULTIPLIER;

export const TILE_SIZE_OLD = 64; // This is temporary tile size used for capybara and player sprites
export const SCALE_FACTOR = TILE_SIZE / TILE_SIZE_OLD;

export const MIN_DIM_CREATOR = 3;
export const MAX_DIM_CREATOR = 12;

export const LAYER_NAMES = {
  FLOOR: "floor", //Floor tiles
  BACKGROUND: "background", //Wall tiles
  FLOOR_DECOYS: "floor decoys", //Things on the floor such as vents or buttons
  ENTITIES: "entities", //Players, enemies and things above floor decoys like lasers
  WALL_DECOYS: "wall decoys", //Upper parts of walls and doord
  EFFECTS: "effects", //Extra effects rendered on top like speech bubbles
} as const;

export const LAYERS = [
  //Layers in order of deepest to shallowest
  LAYER_NAMES.FLOOR,
  LAYER_NAMES.BACKGROUND,
  LAYER_NAMES.FLOOR_DECOYS,
  LAYER_NAMES.ENTITIES,
  LAYER_NAMES.WALL_DECOYS,
  LAYER_NAMES.EFFECTS,
] as const;

export type LAYER_NAME = (typeof LAYERS)[number];
