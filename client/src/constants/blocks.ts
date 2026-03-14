export const ASSETS = {
  EMPTY: 7,
  BUTTON_PRESSED: 13,
  BUTTON_RELEASED: 14,
  BUTTON_BASE: 15,
  DOOR_BASE: 16,
  CRATE: 19,
  POINT_BUTTON: 21,
  DOOR_CLOSED: 22,
  VENT_OPEN: 18,
  VENT_CLOSED: 12,
  LASER_BEAM_HORIZONTAL: 31,
  LASER_BEAM_VERTICAL: 11,
  LASER_BEAM_HORIZONTAL_TIP: 32,
  LASER_BEAM_VERTICAL_TIP: 17,
  // Ghost
  GHOST_ACTIVE_DOWN: 5,
  GHOST_ACTIVE_UP: 23,
  GHOST_ACTIVE_RIGHT: 30,
  // Ghost Color Layer
  GHOST_COLOR_RIGHT: 40,
  GHOST_COLOR_DOWN: 41,
  GHOST_COLOR_UP: 42,
  // Ghost Idle
  GHOST_IDLE_RIGHT: 38,
  GHOST_IDLE_DOWN: 38,
  GHOST_IDLE_UP: 39,
  LASER_GUN: 5,
  LASER_GUN_FIRED: 23,
  LASER_LINE: 11,
  WIRE: 24,
  CABLE_END_ACTIVE: 25,
  SOCKET: 26,
  WIRE_CURVE: 27,
  CABLE_END_INACTIVE: 36,
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
