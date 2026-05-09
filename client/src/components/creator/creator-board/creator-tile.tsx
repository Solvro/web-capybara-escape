import { getTilesetBackgroundPosition } from "../../../utils/tileset-utils";

interface CreatorTileProps {
  sizePx: number;
  tileIndices: (number | null)[];
}

export function CreatorTile({ sizePx, tileIndices }: CreatorTileProps) {
  const sourceTileSizePx = 24;
  const scale = sizePx / sourceTileSizePx;

  const safeTileIndices =
    Array.isArray(tileIndices) && tileIndices.length === 5
      ? tileIndices
      : [null, null, null, null, null];

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
      className="overflow-hidden border-4 border-emerald-950 bg-blue-400"
      style={{
        position: "relative",
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        overflow: "hidden",
        border: "2px solid #333",
        background: "transparent",
      }}
    >
      {safeTileIndices.map((tileIndex, layerId) => {
        if (tileIndex === null) return null;
        const { x, y } = getTilesetBackgroundPosition(
          tileIndex,
          6,
          sourceTileSizePx,
        );
        return (
          <div
            key={layerId}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${sourceTileSizePx}px`,
              height: `${sourceTileSizePx}px`,
              backgroundImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
              backgroundPosition: `${x}px ${y}px`,
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
