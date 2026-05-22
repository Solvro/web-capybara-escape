export const SIZE_MULTIPLIER = 5;

export const TEXTURE_PATH = `url(${import.meta.env.BASE_URL}textures/map-tileset.png)`;
export const TILE_SIZE = 24;
export const CELL_SIZE = TILE_SIZE * SIZE_MULTIPLIER;

export const TALL_WALL_HEIGHT_MULTIPLIER = 1.5;
export const EXTRA_HEIGHT = TALL_WALL_HEIGHT_MULTIPLIER - 1;

export const LAYER_NAMES = {
  BACKGROUND: "background", //Floor tiles and wall tiles
  FLOOR_DECOYS: "floor decoys", //Things on the floor such as vents or buttons
  ENTITIES: "entities", //Players, enemies and things above floor decoys like lasers
  WALL_DECOYS: "wall decoys", //Upper parts of walls and doord
  EFFECTS: "effects", //Extra effects rendered on top like speech bubbles
} as const;

export const LAYERS = [
  //Layers in order of deepest to shallowest
  LAYER_NAMES.BACKGROUND,
  LAYER_NAMES.FLOOR_DECOYS,
  LAYER_NAMES.ENTITIES,
  LAYER_NAMES.WALL_DECOYS,
  LAYER_NAMES.EFFECTS,
] as const;

export type LAYER_NAME = (typeof LAYERS)[number];

export const layerNameToIndex: Record<string, number> = {
  [LAYER_NAMES.BACKGROUND]: 0,
  [LAYER_NAMES.FLOOR_DECOYS]: 1,
  [LAYER_NAMES.ENTITIES]: 2,
  [LAYER_NAMES.WALL_DECOYS]: 3,
};
