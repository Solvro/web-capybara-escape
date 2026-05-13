import { TILE_MAPPING } from "../constants/blocks";
import { EXTRA_HEIGHT } from "../constants/global";

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
