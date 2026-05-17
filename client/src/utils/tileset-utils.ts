import { ENTITY_MAPPING, TILE_MAPPING } from "../constants/blocks";
import { EXTRA_HEIGHT } from "../constants/global";
import { Direction, type DirectionType } from "../types/direction";

export function getTilesetBackgroundPosition(
  frame: number,
  tilesetCols = 6,
  tileSize = 24,
  withOffset?: boolean,
) {
  const x = -(frame % tilesetCols) * tileSize;
  const y =
    (frame == TILE_MAPPING.w1t.frame || frame == TILE_MAPPING.w2t.frame) &&
    withOffset
      ? -Math.floor(frame / tilesetCols) * tileSize + EXTRA_HEIGHT * tileSize
      : -Math.floor(frame / tilesetCols) * tileSize;
  return { x, y };
}

export function generateInitialTiles(
  dims: [number, number],
  floorDecoys: number[],
  entities: number[],
  wallDecoys: number[],
  TILE_MAPPING: Record<string, { frame: number }>,
): (number | null)[][] {
  const [rows, cols] = dims;
  return Array.from({ length: rows * cols }, (_, idx) => {
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1) {
      return [TILE_MAPPING.w1t.frame, null, null, null];
    }
    const frame =
      Math.random() < 0.8 ? TILE_MAPPING.f1.frame : TILE_MAPPING.w2t.frame;
    if (frame === TILE_MAPPING.w2t.frame) {
      return [frame, null, null, null];
    }

    const layerTypes = [
      () =>
        Math.random() < 0.2
          ? floorDecoys[Math.floor(Math.random() * floorDecoys.length)]
          : null,
      () =>
        Math.random() < 0.15
          ? entities[Math.floor(Math.random() * entities.length)]
          : null,
      () =>
        Math.random() < 0.1
          ? wallDecoys[Math.floor(Math.random() * wallDecoys.length)]
          : null,
    ];

    const which = Math.floor(Math.random() * 4);
    let floorDecoy = null,
      entity = null,
      wallDecoy = null;
    if (which === 0) floorDecoy = layerTypes[0]();
    else if (which === 1) entity = layerTypes[1]();
    else if (which === 2) wallDecoy = layerTypes[2]();

    return [frame, floorDecoy, entity, wallDecoy];
  });
}

type Tile = (number | null)[];

const WALL: Tile = [TILE_MAPPING.w1t.frame, null, null, null];
const FLOOR: Tile = [TILE_MAPPING.f1.frame, null, null, null];

const createWallRow = (cols: number): Tile[] => {
  return Array.from({ length: cols }, () => [...WALL]);
};

export function changeBoardSize(
  dims: [number, number],
  direction: DirectionType | null,
  tileIndices: Tile[],
): Tile[] {
  const [rows, cols] = dims;
  const bigger = rows * cols > tileIndices.length;
  let nextBoard: Tile[] = [];

  if (direction == Direction.TOP) {
    const walls = createWallRow(cols);
    if (bigger) {
      nextBoard = [...tileIndices];
      for (let i = 1; i < cols - 1; i++) {
        nextBoard[i] = [...FLOOR];
      }
      return [...walls, ...nextBoard];
    } else {
      return [...walls, ...tileIndices.slice(cols * 2)];
    }
  }

  if (direction == Direction.BOTTOM) {
    const walls = createWallRow(cols);
    if (bigger) {
      nextBoard = [...tileIndices];
      const oldBottomStart = (rows - 2) * cols;
      for (let i = 1; i < cols - 1; i++) {
        nextBoard[oldBottomStart + i] = [...FLOOR];
      }
      return [...nextBoard, ...walls];
    } else {
      return [...tileIndices.slice(0, -(cols * 2)), ...walls];
    }
  }

  if (direction == Direction.LEFT) {
    const oldCols = bigger ? cols - 1 : cols + 1;

    for (let i = 0; i < tileIndices.length; i++) {
      if (bigger) {
        if (i % oldCols === 0) {
          nextBoard.push([...WALL]);
          const isCorner = i === 0 || i === oldCols * (rows - 1);
          nextBoard.push(isCorner ? [...WALL] : [...FLOOR]);
        } else {
          nextBoard.push(tileIndices[i]);
        }
      } else {
        const colIndex = i % oldCols;

        if (colIndex === 0) continue;

        if (colIndex === 1) {
          nextBoard.push([...WALL]);
        } else {
          nextBoard.push(tileIndices[i]);
        }
      }
    }
    return nextBoard;
  }

  if (direction == Direction.RIGHT) {
    const oldCols = bigger ? cols - 1 : cols + 1;

    for (let i = 0; i < tileIndices.length; i++) {
      if (bigger) {
        if ((i + 1) % oldCols !== 0) {
          nextBoard.push(tileIndices[i]);
        } else {
          const isCorner = i === oldCols - 1 || i === tileIndices.length - 1;
          nextBoard.push(isCorner ? [...WALL] : [...FLOOR]);
          nextBoard.push([...WALL]);
        }
      } else {
        const colIndex = (i + 1) % oldCols;

        if (colIndex === 0) continue;

        if (colIndex === cols) {
          nextBoard.push([...WALL]);
        } else {
          nextBoard.push(tileIndices[i]);
        }
      }
    }
    return nextBoard;
  }

  return tileIndices;
}

const TILESET_COLUMNS = 6;

export const getTileBackgroundData = (
  tileIndex: number,
  sourceTileSizePx: number,
  baseUrl: string,
) => {
  const entity = ENTITY_MAPPING[tileIndex];

  if (entity) {
    return {
      isEntity: true,
      isTall: entity.isTall,
      bgUrl: `url(${baseUrl}${entity.src.substring(1)})`,
      bgPosX: 0,
      bgPosY: entity.offset,
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
    bgUrl: `url(${baseUrl}images/capybara-tileset.png)`,
    bgPosX: pos.x,
    bgPosY: pos.y,
  };
};

export const getUIBlockBackgroundData = (
  frame: number,
  sourceTileSizePx: number,
  baseUrl: string,
) => {
  const isEntity = ENTITY_MAPPING[frame] !== undefined;

  if (isEntity) {
    return {
      bgUrl: `url(${baseUrl}${ENTITY_MAPPING[frame]?.src.substring(1)})`,
      bgPosX: 0,
      bgPosY: 0,
    };
  }

  const pos = getTilesetBackgroundPosition(
    frame,
    TILESET_COLUMNS,
    sourceTileSizePx,
  );

  return {
    bgUrl: `url(${baseUrl}images/capybara-tileset.png)`,
    bgPosX: pos.x,
    bgPosY: pos.y,
  };
};
