export const ASSETS = {
  BUTTON_PRESSED: 13,
  BUTTON_RELEASED: 14,
  BUTTON_BASE: 15,
  DOOR_OPEN: 16,
  CRATE: 19,
  POINT_BUTTON: 21,
  DOOR_CLOSED: 22,
  VENT_OPEN: 18,
  VENT_CLOSED: 12,
  LASER_GUN: 5,
  LASER_GUN_FIRED: 23,
  LASER_LINE: 11,
  CABLE: 25,
};

// Mapping of tile types to their corresponding frame in the tileset and whether they are tall (require a second tile on top)
export const TILE_MAPPING: Record<
  string,
  { frame: number; isTall?: boolean; frameSecond?: number }
> = {
  w1t: { frame: 0, frameSecond: 10, isTall: true },
  w1: { frame: 0 },
  w13: { frame: 9 },
  w2t: { frame: 2, frameSecond: 4, isTall: true },
  w2: { frame: 2 },
  w3t: { frame: 3, frameSecond: 4, isTall: true },
  w3: { frame: 3 },
  w21: { frame: 8 },
  f1: { frame: 6 },
};
