export const SIZE_MULTIPLIER = 5;

export const TILE_SIZE = 24;
export const CELL_SIZE = TILE_SIZE * SIZE_MULTIPLIER;

export const TILE_SIZE_OLD = 64; // This is temporary tile size used for capybara and player sprites
export const SCALE_FACTOR = TILE_SIZE / TILE_SIZE_OLD;

export const LAYERS = [ //Layers in order of deepest to shallowest
  "background", //Floor tiles and wall tiles
  "floor decoys", //Things on the floor such as vents or buttons
  "entities", //Players, enemies and things above floor decoys like lasers
  "wall decoys", //Upper parts of walls and doord
  "effects", //Extra effects rendered on top like speech bubbles
] as const;
export type LayerNames = typeof LAYERS[number];
