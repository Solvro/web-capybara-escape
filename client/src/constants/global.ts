export const SIZE_MULTIPLIER = 5;

export const TILE_SIZE = 24;
export const CELL_SIZE = TILE_SIZE * SIZE_MULTIPLIER;

export const MIN_DIM_CREATOR = 3;
export const MAX_DIM_CREATOR = 12;

export const TALL_WALL_HEIGHT = 34;
export const TALL_WALL_HEIGHT_MULTIPLIER = TALL_WALL_HEIGHT / TILE_SIZE;
export const EXTRA_HEIGHT = TALL_WALL_HEIGHT_MULTIPLIER - 1;

export const TILESET_URL = `${import.meta.env.BASE_URL}images/capybara-tileset.png`;

export const COLOR_LIST = [
  "#FF3B30",
  "#33cc33",
  "#007AFF",
  "#ffaa00",
  "#aa44ff",
  "#FF00FF",
  "#33CC66",
  "#3399FF",
  "#FF3344",
];

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

export const layerNameToIndex: Record<string, number> = {
  [LAYER_NAMES.FLOOR]: 0,
  [LAYER_NAMES.BACKGROUND]: 1,
  [LAYER_NAMES.FLOOR_DECOYS]: 2,
  [LAYER_NAMES.ENTITIES]: 3,
  [LAYER_NAMES.WALL_DECOYS]: 4,
};
