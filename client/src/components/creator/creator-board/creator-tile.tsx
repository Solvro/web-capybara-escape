import {
  ASSETS,
  ENTITY_MAPPING,
  TILE_MAPPING,
} from "../../../constants/blocks";
import {
  EXTRA_HEIGHT,
  TALL_WALL_HEIGHT_MULTIPLIER,
} from "../../../constants/global";
import { getTilesetBackgroundPosition } from "../../../utils/tileset-utils";

interface CreatorTileProps {
  sizePx: number;
  tileIndices: (number | null)[];
}

const TILESET_COLUMNS = 6;

const getTileBackgroundData = (
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

export function CreatorTile({ sizePx, tileIndices }: CreatorTileProps) {
  const sourceTileSizePx = 24;
  const scale = sizePx / sourceTileSizePx;

  const safeTileIndices =
    Array.isArray(tileIndices) && tileIndices.length === 4
      ? tileIndices
      : [null, null, null, null];

  if (!safeTileIndices.some((idx) => idx !== null)) {
    return (
      <div
        className="overflow-hidden border-4 border-emerald-950 bg-transparent"
        style={{
          width: `${sizePx}px`,
          height: `${sizePx}px`,
        }}
      />
    );
  }

  // Render in stacking order: first index at the bottom
  return (
    <div
      className="overflow-hidden bg-blue-400"
      style={{
        position: "relative",
        width: `${sizePx}px`,
        height: `${sizePx * TALL_WALL_HEIGHT_MULTIPLIER}px`,
        marginTop: `${-sizePx * EXTRA_HEIGHT}px`,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {safeTileIndices.map((tileIndex, layerId) => {
        if (tileIndex === null) return null;
        const { isTall, bgUrl, bgPosX, bgPosY } = getTileBackgroundData(
          tileIndex,
          sourceTileSizePx,
          import.meta.env.BASE_URL,
        );

        return (
          <div
            key={layerId}
            style={{
              position: "absolute",
              top:
                tileIndices[0] === TILE_MAPPING.w1t.frame ||
                tileIndices[0] === TILE_MAPPING.w2t.frame ||
                isTall
                  ? 0
                  : `${sizePx * EXTRA_HEIGHT}px`, // AAAAAAAAAA SINGLE SOURCE OF TRUTH
              left: 0,
              width: `${sourceTileSizePx}px`,
              height: `${sourceTileSizePx * TALL_WALL_HEIGHT_MULTIPLIER}px`,
              backgroundImage: bgUrl,
              backgroundPosition: `${bgPosX}px ${bgPosY}px`,
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}
