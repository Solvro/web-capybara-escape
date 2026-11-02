import { MONITOR_ASPECT } from "@/components/loading-animator-wrapper/constants";
import { CELL_SIZE } from "@/constants/global";

export const WALL_TOP_PAD = CELL_SIZE;

export interface GameViewport {
  gameWidth: number;
  gameHeight: number;
  scrollX: number;
  scrollY: number;
}

export function getGameViewport(
  mapWidthCells: number,
  mapHeightCells: number,
): GameViewport {
  const mapW = mapWidthCells * CELL_SIZE;
  const mapH = mapHeightCells * CELL_SIZE;
  const contentW = mapW;
  const contentH = mapH + WALL_TOP_PAD;

  let gameWidth: number;
  let gameHeight: number;

  if (contentW / contentH > MONITOR_ASPECT) {
    gameWidth = contentW;
    gameHeight = Math.round(contentW / MONITOR_ASPECT);
  } else {
    gameHeight = contentH;
    gameWidth = Math.round(contentH * MONITOR_ASPECT);
  }

  const offsetX = (gameWidth - mapW) / 2;
  const offsetY = WALL_TOP_PAD + (gameHeight - contentH) / 2;

  return {
    gameWidth,
    gameHeight,
    scrollX: -offsetX,
    scrollY: -offsetY,
  };
}
