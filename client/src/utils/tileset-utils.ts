export function getTilesetBackgroundPosition(
  frame: number,
  tilesetCols = 6,
  tileSize = 24,
) {
  const x = -(frame % tilesetCols) * tileSize;
  const y = -Math.floor(frame / tilesetCols) * tileSize;
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
      return [TILE_MAPPING.w1.frame, null, null, null];
    }
    const frame =
      Math.random() < 0.8 ? TILE_MAPPING.f1.frame : TILE_MAPPING.w2.frame;
    if (frame === TILE_MAPPING.w2.frame) {
      return [frame, null, null, null];
    }
    const floorDecoy =
      Math.random() < 0.2
        ? floorDecoys[Math.floor(Math.random() * floorDecoys.length)]
        : null;
    const entity =
      Math.random() < 0.15
        ? entities[Math.floor(Math.random() * entities.length)]
        : null;
    const wallDecoy =
      Math.random() < 0.1
        ? wallDecoys[Math.floor(Math.random() * wallDecoys.length)]
        : null;
    return [frame, floorDecoy, entity, wallDecoy];
  });
}
