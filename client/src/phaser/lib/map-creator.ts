import type * as Phaser from "phaser";

import { TILE_MAPPING } from "../../constants/blocks";
import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";

export function createMap(
  grid: string[][],
  width: number,
  height: number,
  scene: Phaser.Scene,
) {
  // console.log(grid);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tileType = grid[y][x];
      const posX = x * CELL_SIZE + CELL_SIZE / 2;
      const posY = y * CELL_SIZE + CELL_SIZE / 2;

      const config = TILE_MAPPING[tileType];

      // if floor detected, add floor tile
      if (tileType === "f1") {
        scene.add
          .image(posX, posY, "tileset", config.frame)
          .setDepth(0)
          .setScale(SIZE_MULTIPLIER);
      }

      // if wall detected, add wall tile (and second 0.5 tile if tall)
      if (tileType.startsWith("w")) {
        scene.add
          .image(posX, posY, "tileset", config.frame)
          .setDepth(posY)
          .setScale(SIZE_MULTIPLIER);

        if (config.isTall ?? false) {
          scene.add
            .image(posX, posY - CELL_SIZE, "tileset", config.frameSecond)
            .setScale(SIZE_MULTIPLIER)
            .setDepth(posY);
        }
      }
    }
  }
}
