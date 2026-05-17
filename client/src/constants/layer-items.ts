import { ASSETS, TILE_MAPPING } from "./blocks";
import { COLOR_LIST, LAYER_NAMES } from "./global";

export const LAYER_ITEM_KEYS = {
  FLOOR: "f1",
  BRICK_WALL: "w1t",
  SERVER_WALL: "w2t",
  EMPTY_BG: "empty",

  BUTTON: "button",
  CABLE_ACTIVE: "cable",
  CABLE_INACTIVE: "cableInactive",
  SOCKET: "socket",
  WIRE: "wire",
  WIRE_CURVE: "wireCurve",
  VENT_OPEN: "ventOpen",
  VENT_CLOSED: "ventClosed",
  EMPTY_FLOOR: "empty-floor",

  LASER: "laser",
  CRATE: "crate",
  LASER_BEAM_H: "laserBeamH",
  LASER_BEAM_V: "laserBeamV",
  LASER_BEAM_H_TIP: "laserBeamHTip",
  LASER_BEAM_V_TIP: "laserBeamVTip",
  EMPTY_ENTITIES: "empty-entities",

  DOOR: "door",
  EMPTY_WALLS: "empty-walls",

  CAPYBARA_START: "capy-start",
  SOL_START: "sol-start",
  VRON_START: "vron-start",
} as const;

export interface LayerItem {
  key: string;
  label: string;
  frame: number;
  layer: string;
  color?: string;
  baseFrame?: number;
  direction?: "up" | "down" | "left" | "right";
  colorable?: boolean;
  baseKey?: string;
}

const coloredButtons: LayerItem[] = COLOR_LIST.map((color, index) => ({
  key: `${LAYER_ITEM_KEYS.BUTTON}-${index}`,
  label: `Button`,
  frame: ASSETS.BUTTON_RELEASED,
  layer: LAYER_NAMES.FLOOR_DECOYS,
  color,
  baseFrame: ASSETS.BUTTON_BASE,
  colorable: true,
  baseKey: LAYER_ITEM_KEYS.BUTTON,
}));

const coloredDoors: LayerItem[] = COLOR_LIST.map((color, index) => ({
  key: `${LAYER_ITEM_KEYS.DOOR}-${index}`,
  label: `Door`,
  frame: ASSETS.DOOR_CLOSED,
  layer: LAYER_NAMES.WALL_DECOYS,
  color,
  baseFrame: ASSETS.DOOR_BASE,
  colorable: true,
  baseKey: LAYER_ITEM_KEYS.DOOR,
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
      key: `${LAYER_ITEM_KEYS.LASER}-${colorIdx}-${direction}`,
      label: `Laser ${direction}`,
      frame: colorFrame, // Colorized part
      baseFrame: frame, // Base sprite
      layer: LAYER_NAMES.ENTITIES,
      color,
      direction,
      colorable: true,
      baseKey: `${LAYER_ITEM_KEYS.LASER}-${direction}`,
    };
  }),
);

export const LAYER_ITEMS: Record<string, LayerItem[]> = {
  [LAYER_NAMES.FLOOR]: [
    {
      key: LAYER_ITEM_KEYS.FLOOR,
      label: "Floor",
      frame: TILE_MAPPING.f1.frame,
      layer: LAYER_NAMES.FLOOR,
    },
    {
      key: LAYER_ITEM_KEYS.EMPTY_FLOOR,
      label: "Empty",
      frame: ASSETS.EMPTY,
      layer: LAYER_NAMES.FLOOR,
    },
  ],
  [LAYER_NAMES.BACKGROUND]: [
    {
      key: LAYER_ITEM_KEYS.BRICK_WALL,
      label: "Brick wall",
      frame: TILE_MAPPING.w1t.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: LAYER_ITEM_KEYS.SERVER_WALL,
      label: "Server wall",
      frame: TILE_MAPPING.w2t.frame,
      layer: LAYER_NAMES.BACKGROUND,
    },
    {
      key: LAYER_ITEM_KEYS.EMPTY_BG,
      label: "Empty",
      frame: ASSETS.EMPTY,
      layer: LAYER_NAMES.BACKGROUND,
    },
  ],
  [LAYER_NAMES.FLOOR_DECOYS]: [
    ...coloredButtons,
    {
      key: LAYER_ITEM_KEYS.CABLE_ACTIVE,
      label: "Cable Active",
      frame: ASSETS.CABLE_END_ACTIVE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: LAYER_ITEM_KEYS.CABLE_INACTIVE,
      label: "Cable Inactive",
      frame: ASSETS.CABLE_END_INACTIVE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: LAYER_ITEM_KEYS.SOCKET,
      label: "Socket",
      frame: ASSETS.SOCKET,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: LAYER_ITEM_KEYS.WIRE,
      label: "Wire",
      frame: ASSETS.WIRE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: LAYER_ITEM_KEYS.WIRE_CURVE,
      label: "Wire Curve",
      frame: ASSETS.WIRE_CURVE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: LAYER_ITEM_KEYS.VENT_OPEN,
      label: "Vent Open",
      frame: ASSETS.VENT_OPEN,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: LAYER_ITEM_KEYS.VENT_CLOSED,
      label: "Vent Closed",
      frame: ASSETS.VENT_CLOSED,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
    {
      key: LAYER_ITEM_KEYS.EMPTY_FLOOR,
      label: "Empty",
      frame: ASSETS.EMPTY,
      layer: LAYER_NAMES.FLOOR_DECOYS,
    },
  ],
  [LAYER_NAMES.ENTITIES]: [
    ...coloredLasers,
    {
      key: LAYER_ITEM_KEYS.CRATE,
      label: "Crate",
      frame: ASSETS.CRATE,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: LAYER_ITEM_KEYS.LASER_BEAM_H,
      label: "Beam Horiz.",
      frame: ASSETS.LASER_BEAM_HORIZONTAL,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: LAYER_ITEM_KEYS.LASER_BEAM_V,
      label: "Beam Vert.",
      frame: ASSETS.LASER_BEAM_VERTICAL,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: LAYER_ITEM_KEYS.LASER_BEAM_H_TIP,
      label: "Beam H Tip",
      frame: ASSETS.LASER_BEAM_HORIZONTAL_TIP,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: LAYER_ITEM_KEYS.LASER_BEAM_V_TIP,
      label: "Beam V Tip",
      frame: ASSETS.LASER_BEAM_VERTICAL_TIP,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: LAYER_ITEM_KEYS.CAPYBARA_START,
      label: "Capybara",
      frame: ASSETS.CAPYBARA_START,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: LAYER_ITEM_KEYS.SOL_START,
      label: "Sol",
      frame: ASSETS.SOL_START,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: LAYER_ITEM_KEYS.VRON_START,
      label: "Vron",
      frame: ASSETS.VRON_START,
      layer: LAYER_NAMES.ENTITIES,
    },
    {
      key: LAYER_ITEM_KEYS.EMPTY_ENTITIES,
      label: "Empty",
      frame: ASSETS.EMPTY,
      layer: LAYER_NAMES.ENTITIES,
    },
  ],
  [LAYER_NAMES.WALL_DECOYS]: [
    ...coloredDoors,
    {
      key: LAYER_ITEM_KEYS.EMPTY_WALLS,
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

/**
 * Groups all color variants by their baseKey.
 * e.g. "button" -> [button-0, button-1, ...], "laser-right" -> [laser-0-right, laser-1-right, ...]
 */
export const COLORABLE_BASE_ITEMS: Record<string, LayerItem[]> = {};
Object.values(LAYER_ITEMS)
  .flat()
  .filter((item) => item.colorable && item.baseKey)
  .forEach((item) => {
    const base = item.baseKey!;
    if (!COLORABLE_BASE_ITEMS[base]) {
      COLORABLE_BASE_ITEMS[base] = [];
    }
    COLORABLE_BASE_ITEMS[base].push(item);
  });

/**
 * Get a specific colored variant for a base item type.
 * @param baseKey - The base key (e.g. "button", "door", "laser-right")
 * @param colorIndex - Index into COLOR_LIST
 */
export function getColoredVariant(
  baseKey: string,
  colorIndex: number,
): LayerItem | null {
  const variants = COLORABLE_BASE_ITEMS[baseKey];
  if (!variants) return null;
  return variants[colorIndex] ?? null;
}

/**
 * Returns deduplicated items for the grid display.
 * Colorable items are collapsed to show only the first color variant as representative.
 */
export function getGridItems(layerKey: string): LayerItem[] {
  const items = LAYER_ITEMS[layerKey] ?? [];
  const seenBaseKeys = new Set<string>();
  const result: LayerItem[] = [];

  for (const item of items) {
    if (item.colorable && item.baseKey) {
      if (seenBaseKeys.has(item.baseKey)) continue;
      seenBaseKeys.add(item.baseKey);
    }
    result.push(item);
  }
  return result;
}
