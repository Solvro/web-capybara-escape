import type { Direction, FormattedLevelType } from "@capybara/shared";

import { ANGLE_TO_TEXT, ENTITY_MAPPING } from "../constants/blocks";
import {
  COLOR_LIST,
  EXTRA_HEIGHT,
  LAYER_NAMES,
  TALL_WALL_HEIGHT,
  TILESET_URL,
  layerNameToIndex,
} from "../constants/global";
import { ALL_ITEMS_MAP, LAYER_ITEM_KEYS } from "../constants/layer-items";

export function countEntityOccurrences(
  tileData: (string | null)[][],
  entityKey: string,
  excludeTileIdx?: number,
): number {
  const layerIdx = layerNameToIndex[LAYER_NAMES.ENTITIES];
  let count = 0;

  tileData.forEach((tile, tileIdx) => {
    if (tileIdx === excludeTileIdx) return;
    const value = tile[layerIdx];
    if (!value) return;
    const baseKey = value.split("-")[0];
    if (value === entityKey || baseKey === entityKey) {
      count++;
    }
  });

  return count;
}

export function getTilesetBackgroundPosition(
  frame: number,
  tilesetCols = 6,
  tileSize = 24,
  withOffset?: boolean,
) {
  const x = -(frame % tilesetCols) * tileSize;
  const y =
    (frame == ALL_ITEMS_MAP[LAYER_ITEM_KEYS.BRICK_WALL].frame ||
      frame == ALL_ITEMS_MAP[LAYER_ITEM_KEYS.SERVER_WALL].frame) &&
    withOffset
      ? -Math.floor(frame / tilesetCols) * tileSize + EXTRA_HEIGHT * tileSize
      : -Math.floor(frame / tilesetCols) * tileSize;
  return { x, y };
}

export function generateInitialTiles(
  dims: [number, number],
  floorDecoys: string[],
  entities: string[],
  wallDecoys: string[],
): (string | null)[][] {
  const [rows, cols] = dims;
  const f1 = ALL_ITEMS_MAP[LAYER_ITEM_KEYS.FLOOR]!;
  const w1 = ALL_ITEMS_MAP[LAYER_ITEM_KEYS.BRICK_WALL]!;
  const w2 = ALL_ITEMS_MAP[LAYER_ITEM_KEYS.SERVER_WALL]!;

  return Array.from({ length: rows * cols }, (_, idx) => {
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1) {
      return [f1.key, w1.key, null, null, null];
    }

    const secondary = Math.random() < 0.8 ? null : w2;
    if (secondary !== null) {
      return [f1.key, secondary.key, null, null, null];
    }

    const layerTypes = [
      () =>
        Math.random() < 0.2
          ? (floorDecoys[Math.floor(Math.random() * floorDecoys.length)] ??
            null)
          : null,
      () =>
        Math.random() < 0.15
          ? (entities[Math.floor(Math.random() * entities.length)] ?? null)
          : null,
      () =>
        Math.random() < 0.1
          ? (wallDecoys[Math.floor(Math.random() * wallDecoys.length)] ?? null)
          : null,
    ];

    const which = Math.floor(Math.random() * 4);
    let floorDecoy: string | null = null,
      entity: string | null = null,
      wallDecoy: string | null = null;
    if (which === 0) floorDecoy = layerTypes[0]();
    else if (which === 1) entity = layerTypes[1]();
    else if (which === 2) wallDecoy = layerTypes[2]();

    return [f1.key, null, floorDecoy, entity, wallDecoy];
  });
}

type Tile = (string | null)[];
const w1Tile = ALL_ITEMS_MAP[LAYER_ITEM_KEYS.BRICK_WALL]!;
const floorTile = ALL_ITEMS_MAP[LAYER_ITEM_KEYS.FLOOR]!;

const WALL: Tile = [null, w1Tile.key, null, null, null];
const FLOOR: Tile = [floorTile.key, null, null, null, null];

const createWallRow = (cols: number): Tile[] => {
  return Array.from({ length: cols }, () => [...WALL]);
};

export function changeBoardSize(
  dims: [number, number],
  direction: Direction | null,
  tileData: Tile[],
): Tile[] {
  const [rows, cols] = dims;
  const bigger = rows * cols > tileData.length;
  let nextBoard: Tile[] = [];
  if (direction == "up") {
    const walls = createWallRow(cols);
    if (bigger) {
      nextBoard = [...tileData];
      for (let i = 1; i < cols - 1; i++) {
        nextBoard[i] = [...FLOOR];
      }
      return [...walls, ...nextBoard];
    } else {
      return [...walls, ...tileData.slice(cols * 2)];
    }
  }

  if (direction == "down") {
    const walls = createWallRow(cols);
    if (bigger) {
      nextBoard = [...tileData];
      const oldBottomStart = (rows - 2) * cols;
      for (let i = 1; i < cols - 1; i++) {
        nextBoard[oldBottomStart + i] = [...FLOOR];
      }
      return [...nextBoard, ...walls];
    } else {
      return [...tileData.slice(0, -(cols * 2)), ...walls];
    }
  }

  if (direction == "left") {
    const oldCols = bigger ? cols - 1 : cols + 1;

    for (let i = 0; i < tileData.length; i++) {
      if (bigger) {
        if (i % oldCols === 0) {
          nextBoard.push([...WALL]);
          const isCorner = i === 0 || i === oldCols * (rows - 1);
          nextBoard.push(isCorner ? [...WALL] : [...FLOOR]);
        } else {
          nextBoard.push(tileData[i]);
        }
      } else {
        const colIndex = i % oldCols;
        if (colIndex === 0) continue;
        if (colIndex === 1) {
          nextBoard.push([...WALL]);
        } else {
          nextBoard.push(tileData[i]);
        }
      }
    }

    return nextBoard;
  }

  if (direction == "right") {
    const oldCols = bigger ? cols - 1 : cols + 1;

    for (let i = 0; i < tileData.length; i++) {
      if (bigger) {
        if ((i + 1) % oldCols !== 0) {
          nextBoard.push(tileData[i]);
        } else {
          const isCorner = i === oldCols - 1 || i === tileData.length - 1;
          nextBoard.push(isCorner ? [...WALL] : [...FLOOR]);
          nextBoard.push([...WALL]);
        }
      } else {
        const colIndex = (i + 1) % oldCols;

        if (colIndex === 0) continue;

        if (colIndex === cols) {
          nextBoard.push([...WALL]);
        } else {
          nextBoard.push(tileData[i]);
        }
      }
    }

    return nextBoard;
  }

  return tileData;
}

const TILESET_COLUMNS = 6;

function buildEntityTextureUrl(src: string, baseUrl: string) {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const path = src.startsWith("/") ? src.slice(1) : src;
  return `url("${encodeURI(`${normalizedBase}${path}`)}")`;
}

export type EntityRenderData = {
  bgUrl: string;
  bgPosX: number;
  bgPosY: number;
  frameWidth: number;
  frameHeight: number;
  topSourcePx: number;
};

export function getEntityRenderData(
  frame: number,
  sourceTileSizePx: number,
  baseUrl: string,
): EntityRenderData | null {
  const entity = ENTITY_MAPPING[frame];
  if (!entity) return null;

  const frameWidth = entity.frameWidth ?? sourceTileSizePx;
  const frameHeight = entity.frameHeight ?? sourceTileSizePx;
  const tilesetCols = entity.tilesetCols ?? TILESET_COLUMNS;
  const spriteOffset = entity.spriteOffset ?? { x: 0, y: 0 };
  const pos = getTilesetBackgroundPosition(
    entity.previewFrame,
    tilesetCols,
    frameHeight,
  );

  const topSourcePx = entity.floorAnchored
    ? TALL_WALL_HEIGHT - frameHeight + spriteOffset.y
    : 0;

  return {
    bgUrl: buildEntityTextureUrl(entity.src, baseUrl),
    bgPosX: pos.x + spriteOffset.x,
    bgPosY: pos.y,
    frameWidth,
    frameHeight,
    topSourcePx,
  };
}

export const getTileBackgroundData = (
  tileIndex: number,
  sourceTileSizePx: number,
  baseUrl: string,
) => {
  const entityRenderData = getEntityRenderData(
    tileIndex,
    sourceTileSizePx,
    baseUrl,
  );

  if (entityRenderData) {
    return {
      isEntity: true,
      isTall: false,
      ...entityRenderData,
    };
  }

  const pos = getTilesetBackgroundPosition(
    tileIndex,
    TILESET_COLUMNS,
    sourceTileSizePx,
    true,
  );
  return {
    isEntity: false,
    isTall: false,
    bgUrl: `url(${TILESET_URL})`,
    bgPosX: pos.x,
    bgPosY: pos.y,
  };
};

export const getUIBlockBackgroundData = (
  frame: number,
  sourceTileSizePx: number,
  baseUrl: string,
) => {
  const entityRenderData = getEntityRenderData(
    frame,
    sourceTileSizePx,
    baseUrl,
  );

  if (entityRenderData) {
    return entityRenderData;
  }

  const pos = getTilesetBackgroundPosition(
    frame,
    TILESET_COLUMNS,
    sourceTileSizePx,
  );

  return {
    bgUrl: `url(${TILESET_URL})`,
    bgPosX: pos.x,
    bgPosY: pos.y,
  };
};

export const formatLevel = (
  tileIndices: (string | null)[][],
  dims: [number, number],
) => {
  const formattedLevel: FormattedLevelType = {
    maxClients: 2,
    height: dims[0],
    width: dims[1],
    layout: [[]],
    mechanics: [],
    entities: {
      players: [],
      enemies: [],
      crates: [],
      steelBoxes: [],
      vents: [],
      capybara: { x: 0, y: 0 },
    },
  };

  let x = 0,
    y = 0;
  let cableCount = 0,
    laserCount = 0;

  tileIndices.forEach((element, index) => {
    const frame =
      element[1] !== null ? element[1] : element[0] !== null ? element[0] : "";
    formattedLevel.layout[y].push(frame);

    const entityKey = element[layerNameToIndex[LAYER_NAMES.ENTITIES]];
    const entityLayer = entityKey?.split("-");
    const wallDecoyLayer =
      element[layerNameToIndex[LAYER_NAMES.WALL_DECOYS]]?.split("-");
    const floorDecoyLayer =
      element[layerNameToIndex[LAYER_NAMES.FLOOR_DECOYS]]?.split("-");

    if (entityKey) {
      if (entityKey === LAYER_ITEM_KEYS.CAPYBARA_START) {
        formattedLevel.entities.capybara = { x, y };
      } else if (entityKey === LAYER_ITEM_KEYS.ENEMY) {
        formattedLevel.entities.enemies.push({ x, y });
      } else if (entityLayer?.[1] === "start") {
        formattedLevel.entities.players.push({ x, y });
      } else if (entityKey === LAYER_ITEM_KEYS.STEEL_BOX) {
        formattedLevel.entities.steelBoxes.push({ x, y });
      } else if (entityLayer?.[0] === LAYER_ITEM_KEYS.CRATE) {
        formattedLevel.entities.crates.push({ x, y });
      } else if (entityLayer?.[0] === LAYER_ITEM_KEYS.LASER) {
        const color = COLOR_LIST[Number.parseInt(entityLayer[1])];
        formattedLevel.mechanics.push({
          type: "laser",
          x,
          y,
          id: `laser-${color}-${laserCount}`,
          direction: entityLayer[2],
          range: 4,
          color,
          active: true,
          activeDuration: 2000,
          inactiveDuration: 2000,
          delay: 2000,
        });
        laserCount++;
      }
    }

    if (wallDecoyLayer && wallDecoyLayer[0] === LAYER_ITEM_KEYS.DOOR) {
      const colorIndex = Number.parseInt(wallDecoyLayer[1]);
      const color = COLOR_LIST[colorIndex];
      formattedLevel.mechanics.push({
        id: `door-${color}-${colorIndex}`,
        type: "door",
        color,
        x,
        y,
        active: false,
      });
    }

    if (floorDecoyLayer) {
      if (floorDecoyLayer[0] === LAYER_ITEM_KEYS.WIRE) {
        formattedLevel.mechanics.push({
          type: "wire",
          x,
          y,
          direction: ANGLE_TO_TEXT[floorDecoyLayer[1]],
        });
      } else if (floorDecoyLayer[0] === LAYER_ITEM_KEYS.WIRE_CURVE) {
        const curveDirectionByAngle: Record<string, string> = {
          "0": "down-right",
          "90": "down-left",
          "180": "up-left",
          "270": "up-right",
        };

        formattedLevel.mechanics.push({
          type: "wire",
          x,
          y,
          direction: curveDirectionByAngle[floorDecoyLayer[1]],
        });
      } else if (floorDecoyLayer[0] === LAYER_ITEM_KEYS.SOCKET) {
        formattedLevel.mechanics.push({
          type: "wire",
          x,
          y,
          direction: "socket",
        });
      } else if (
        floorDecoyLayer[0] === LAYER_ITEM_KEYS.CABLE_ACTIVE ||
        floorDecoyLayer[0] === LAYER_ITEM_KEYS.CABLE_INACTIVE
      ) {
        cableCount++;
        formattedLevel.mechanics.push({
          type: "cable",
          x,
          y,
          id: `cable-${cableCount}`,
          direction: ANGLE_TO_TEXT[floorDecoyLayer[1]],
          damageMs: 1000,
          safeMs: 1000,
          startDamaging: floorDecoyLayer[0] === LAYER_ITEM_KEYS.CABLE_ACTIVE,
        });
      } else if (floorDecoyLayer[0] === LAYER_ITEM_KEYS.BUTTON) {
        const colorIndex = Number.parseInt(floorDecoyLayer[1]);
        const color = COLOR_LIST[colorIndex];
        formattedLevel.mechanics.push({
          id: `button-${color}-${colorIndex}`,
          type: "button",
          color,
          x,
          y,
          doorId: `door-${color}-${colorIndex}`,
        });
      } else if (
        floorDecoyLayer[0] === LAYER_ITEM_KEYS.VENT_CLOSED ||
        floorDecoyLayer[0] === LAYER_ITEM_KEYS.VENT_OPEN
      ) {
        formattedLevel.entities.vents.push({
          x: x,
          y: y,
          open: floorDecoyLayer[0] === LAYER_ITEM_KEYS.VENT_OPEN,
        });
      }
    }

    x = (x + 1) % dims[1];
    if (x === 0 && index !== dims[1] * dims[0] - 1) {
      y++;
      formattedLevel.layout.push([]);
    }
  });

  return formattedLevel;
};
