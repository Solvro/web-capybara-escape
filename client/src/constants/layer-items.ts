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
  EMPTY_ENTITIES: "empty-entities",

  DOOR: "door",
  EMPTY_WALLS: "empty-walls",

  CAPYBARA_START: "capy-start",
  SOL_START: "sol-start",
  VRON_START: "vron-start",
} as const;

export const FLOOR_DECOY_ROTATION_DEGREES = [0, 90, 180, 270] as const;
export type FloorDecoyRotationDeg =
  (typeof FLOOR_DECOY_ROTATION_DEGREES)[number];

export const ROTATABLE_FLOOR_BASE_KEYS_SORTED = [
  LAYER_ITEM_KEYS.WIRE_CURVE,
  LAYER_ITEM_KEYS.CABLE_INACTIVE,
  LAYER_ITEM_KEYS.CABLE_ACTIVE,
  LAYER_ITEM_KEYS.WIRE,
] as const;

export type RotatableFloorBaseKey =
  (typeof ROTATABLE_FLOOR_BASE_KEYS_SORTED)[number];

export function isRotatableFloorBaseKey(
  key: string,
): key is RotatableFloorBaseKey {
  return (ROTATABLE_FLOOR_BASE_KEYS_SORTED as readonly string[]).includes(key);
}

export function parseRotatableFloorKey(tileKey: string): {
  baseKey: RotatableFloorBaseKey;
  rotationDeg: FloorDecoyRotationDeg;
} | null {
  for (const base of ROTATABLE_FLOOR_BASE_KEYS_SORTED) {
    if (tileKey === base) {
      return { baseKey: base, rotationDeg: 0 };
    }
    if (tileKey.startsWith(`${base}-`)) {
      const suf = tileKey.slice(base.length + 1);
      const deg = Number(suf) as FloorDecoyRotationDeg;
      if (
        Number.isFinite(deg) &&
        (FLOOR_DECOY_ROTATION_DEGREES as readonly number[]).includes(deg)
      ) {
        return { baseKey: base, rotationDeg: deg };
      }
    }
  }
  return null;
}

export function creatorPaletteKeyForLookup(tileKey: string): string {
  return parseRotatableFloorKey(tileKey)?.baseKey ?? tileKey;
}

export function nextFloorDecoyQuarterTurn(
  rotationDeg: FloorDecoyRotationDeg,
): FloorDecoyRotationDeg {
  const seq = [...FLOOR_DECOY_ROTATION_DEGREES];
  const idx = seq.indexOf(rotationDeg);
  return seq[(idx + 1) % seq.length]!;
}

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
  rotationDeg?: FloorDecoyRotationDeg;
  supportsRotation?: boolean;
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
      supportsRotation: true,
    },
    {
      key: LAYER_ITEM_KEYS.CABLE_INACTIVE,
      label: "Cable Inactive",
      frame: ASSETS.CABLE_END_INACTIVE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
      supportsRotation: true,
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
      supportsRotation: true,
    },
    {
      key: LAYER_ITEM_KEYS.WIRE_CURVE,
      label: "Wire Curve",
      frame: ASSETS.WIRE_CURVE,
      layer: LAYER_NAMES.FLOOR_DECOYS,
      supportsRotation: true,
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

for (const item of Object.values(LAYER_ITEMS).flat()) {
  if (!item.supportsRotation) continue;
  for (const deg of FLOOR_DECOY_ROTATION_DEGREES) {
    const k = `${item.key}-${deg}`;
    ALL_ITEMS_MAP[k] = {
      ...item,
      key: k,
      rotationDeg: deg,
      label: item.label,
    };
  }
  ALL_ITEMS_MAP[item.key] = ALL_ITEMS_MAP[`${item.key}-0`]!;
}

export function paletteDisplayLabel(item: LayerItem): string {
  const paletteKey = creatorPaletteKeyForLookup(item.key);
  return ALL_ITEMS_MAP[paletteKey]?.label ?? item.label;
}

export function getRotatedFloorPlacementItem(
  baseKey: string,
  rotationDeg: FloorDecoyRotationDeg,
): LayerItem | null {
  return ALL_ITEMS_MAP[`${baseKey}-${rotationDeg}`] ?? null;
}

/**
 * Groups all color variants by their baseKey.
 * button -> [button-0, button-1, ...], laser-right -> [laser-0-right, laser-1-right, ...]
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
 * @param baseKey - The base key
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
