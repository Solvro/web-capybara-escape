import { ASSETS, TILE_MAPPING } from "./blocks";
import { LAYER_NAMES } from "./global";

export const LAYER_ORDER = [
  LAYER_NAMES.BACKGROUND,
  LAYER_NAMES.FLOOR_DECOYS,
  LAYER_NAMES.ENTITIES,
  LAYER_NAMES.WALL_DECOYS,
];

export interface LayerItem {
  key: string;
  label: string;
  frame: number;
  layer: string;
}

export const LAYER_ITEMS: Record<string, LayerItem[]> = {
  [LAYER_NAMES.BACKGROUND]: [
    {
      key: "f1",
      label: "Floor",
      frame: TILE_MAPPING.f1.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w1t",
      label: "Wall 1 Top",
      frame: TILE_MAPPING.w1t.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w1t-upper",
      label: "Wall 1 Upper",
      frame: 10,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w1",
      label: "Wall 1",
      frame: TILE_MAPPING.w1.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w13",
      label: "Wall 1-3",
      frame: TILE_MAPPING.w13.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w2t",
      label: "Wall 2 Top",
      frame: TILE_MAPPING.w2t.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w2t-upper",
      label: "Wall 2/3 Upper",
      frame: 4,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w2",
      label: "Wall 2",
      frame: TILE_MAPPING.w2.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w3t",
      label: "Wall 3 Top",
      frame: TILE_MAPPING.w3t.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w3",
      label: "Wall 3",
      frame: TILE_MAPPING.w3.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w21",
      label: "Wall 2-1",
      frame: TILE_MAPPING.w21.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "empty",
      label: "Empty",
      frame: ASSETS.EMPTY,
      layer: LAYER_NAMES.BACKGROUND,
    },
  ],
  [LAYER_NAMES.FLOOR_DECOYS]: [
    {
      key: "button",
      label: "Button",
      frame: ASSETS.BUTTON_RELEASED,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: "buttonPressed",
      label: "Button Pressed",
      frame: ASSETS.BUTTON_PRESSED,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: "buttonBase",
      label: "Button Base",
      frame: ASSETS.BUTTON_BASE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: "pointButton",
      label: "Point Button",
      frame: ASSETS.POINT_BUTTON,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: "cable",
      label: "Cable Active",
      frame: ASSETS.CABLE_END_ACTIVE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: "cableInactive",
      label: "Cable Inactive",
      frame: ASSETS.CABLE_END_INACTIVE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: "socket",
      label: "Socket",
      frame: ASSETS.SOCKET,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: "wire",
      label: "Wire",
      frame: ASSETS.WIRE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: "wireCurve",
      label: "Wire Curve",
      frame: ASSETS.WIRE_CURVE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: "ventOpen",
      label: "Vent Open",
      frame: ASSETS.VENT_OPEN,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: "ventClosed",
      label: "Vent Closed",
      frame: ASSETS.VENT_CLOSED,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
  ],
  [LAYER_NAMES.ENTITIES]: [
    {
      key: "crate",
      label: "Crate",
      frame: ASSETS.CRATE,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: "laserGun",
      label: "Laser Gun",
      frame: ASSETS.LASER_GUN,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: "laserGunFired",
      label: "Laser Fired",
      frame: ASSETS.LASER_GUN_FIRED,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: "laserBeamH",
      label: "Beam Horiz.",
      frame: ASSETS.LASER_BEAM_HORIZONTAL,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: "laserBeamV",
      label: "Beam Vert.",
      frame: ASSETS.LASER_BEAM_VERTICAL,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: "laserBeamHTip",
      label: "Beam H Tip",
      frame: ASSETS.LASER_BEAM_HORIZONTAL_TIP,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: "laserBeamVTip",
      label: "Beam V Tip",
      frame: ASSETS.LASER_BEAM_VERTICAL_TIP,
      layer: LAYER_NAMES.ENTITIES,
    },
  ],
  [LAYER_NAMES.WALL_DECOYS]: [
    {
      key: "door",
      label: "Door Closed",
      frame: ASSETS.DOOR_CLOSED,
      layer: LAYER_NAMES.WALL_DECOYS,
    },
    {
      key: "doorBase",
      label: "Door Base",
      frame: ASSETS.DOOR_BASE,
      layer: LAYER_NAMES.WALL_DECOYS,
    },
  ],
};
