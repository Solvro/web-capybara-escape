import { ASSETS, TILE_MAPPING } from "./blocks";
import { COLOR_LIST, LAYER_NAMES } from "./global";

export interface LayerItem {
  key: string;
  label: string;
  frame: number;
  layer: string;
  color?: string;
  baseFrame?: number;
  direction?: "up" | "down" | "left" | "right";
}

const coloredButtons: LayerItem[] = COLOR_LIST.map((color, index) => ({
  key: `button-${index}`,
  label: `Button`,
  frame: ASSETS.BUTTON_RELEASED,
  layer: LAYER_NAMES.FLOOR_DECOYS,
  color,
  baseFrame: ASSETS.BUTTON_BASE,
}));

const coloredDoors: LayerItem[] = COLOR_LIST.map((color, index) => ({
  key: `door-${index}`,
  label: `Door`,
  frame: ASSETS.DOOR_CLOSED,
  layer: LAYER_NAMES.WALL_DECOYS,
  color,
  baseFrame: ASSETS.DOOR_BASE,
}));

const coloredLasers: LayerItem[] = COLOR_LIST.flatMap((color, colorIdx) =>
  (["up", "down", "left", "right"] as const).map((direction) => {
    let frame = ASSETS.GHOST_ACTIVE_RIGHT;
    if (direction === "down") frame = ASSETS.GHOST_ACTIVE_DOWN;
    else if (direction === "up") frame = ASSETS.GHOST_ACTIVE_UP;

    let colorFrame = ASSETS.GHOST_COLOR_RIGHT;
    if (direction === "down") colorFrame = ASSETS.GHOST_COLOR_DOWN;
    else if (direction === "up") colorFrame = ASSETS.GHOST_COLOR_UP;

    return {
      key: `laser-${colorIdx}-${direction}`,
      label: `Laser ${direction}`,
      frame: colorFrame, // Colorized part
      baseFrame: frame, // Base sprite
      layer: LAYER_NAMES.ENTITIES,
      color,
      direction,
    };
  }),
);

export const LAYER_ITEMS: Record<string, LayerItem[]> = {
  [LAYER_NAMES.FLOOR]: [
    {
      key: "f1",
      label: "Floor",
      frame: TILE_MAPPING.f1.frame,
      layer: LAYER_NAMES.FLOOR,
    },
    {
      key: "empty-floor",
      label: "Empty",
      frame: ASSETS.EMPTY,
      layer: LAYER_NAMES.FLOOR,
    },
  ],
  [LAYER_NAMES.BACKGROUND]: [
    {
      key: "w1t",
      label: "Brick wall",
      frame: TILE_MAPPING.w1t.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: "w2t",
      label: "Server wall",
      frame: TILE_MAPPING.w2t.frame,
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
    ...coloredButtons,
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
    {
      key: "empty-floor",
      label: "Empty",
      frame: ASSETS.EMPTY,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
  ],
  [LAYER_NAMES.ENTITIES]: [
    ...coloredLasers,
    {
      key: "crate",
      label: "Crate",
      frame: ASSETS.CRATE,
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
    {
      key: "capy-start",
      label: "Capybara",
      frame: ASSETS.CAPYBARA_START,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: "sol-start",
      label: "Sol",
      frame: ASSETS.SOL_START,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: "vron-start",
      label: "Vron",
      frame: ASSETS.VRON_START,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: "empty-entities",
      label: "Empty",
      frame: ASSETS.EMPTY,
      layer: LAYER_NAMES.ENTITIES,
    },
  ],
  [LAYER_NAMES.WALL_DECOYS]: [
    ...coloredDoors,
    {
      key: "empty-walls",
      label: "Empty",
      frame: ASSETS.EMPTY,
      layer: LAYER_NAMES.WALL_DECOYS,
    },
  ],
};

export const ALL_ITEMS_MAP: Record<string, LayerItem> = {};
Object.values(LAYER_ITEMS)
  .flat()
  .forEach((item) => {
    ALL_ITEMS_MAP[item.key] = item;
  });
