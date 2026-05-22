import type { CSSProperties, ReactElement } from "react";

import { TILESET_URL } from "../../../constants/global";
import { getTilesetBackgroundPosition } from "../../../utils/tileset-utils";

export interface RenderTilesetLayerParams {
  frameId: number;
  color?: string;
  direction?: string;
  tileSizePx?: number;
  heightMultiplier?: number;
  tilesetCols?: number;
  withWallYOffset?: boolean;
}

export function renderTilesetLayer({
  frameId,
  color,
  direction,
  tileSizePx = 24,
  heightMultiplier = 1,
  tilesetCols = 6,
  withWallYOffset = false,
}: RenderTilesetLayerParams): ReactElement {
  const { x: px, y: py } = getTilesetBackgroundPosition(
    frameId,
    tilesetCols,
    tileSizePx,
    withWallYOffset,
  );
  const innerTransform = direction === "left" ? "scaleX(-1)" : "none";

  const baseStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: `${tileSizePx}px`,
    height: `${tileSizePx * heightMultiplier}px`,
    imageRendering: "pixelated",
    transform: innerTransform,
    transformOrigin: "center center",
  };

  if (color) {
    return (
      <div
        style={{
          ...baseStyle,
          backgroundColor: color,
          maskImage: `url(${TILESET_URL})`,
          maskPosition: `${px}px ${py}px`,
          maskRepeat: "no-repeat",
          WebkitMaskImage: `url(${TILESET_URL})`,
          WebkitMaskPosition: `${px}px ${py}px`,
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    );
  }

  return (
    <div
      style={{
        ...baseStyle,
        backgroundImage: `url(${TILESET_URL})`,
        backgroundPosition: `${px}px ${py}px`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
