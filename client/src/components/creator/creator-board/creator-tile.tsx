import { useMemo } from "react";

interface CreatorTileProps {
  sizePx: number;
}

export function CreatorTile({ sizePx }: CreatorTileProps) {
  const sourceTileSizePx = 24;
  const scale = sizePx / sourceTileSizePx;
  const tileIndex = useMemo(() => Math.floor(Math.random() * 4), []);

  return (
    <div
      className="overflow-hidden border-4 border-emerald-950 bg-blue-400"
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
      }}
    >
      <div
        style={{
          width: `${sourceTileSizePx}px`,
          height: `${sourceTileSizePx}px`,
          backgroundImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
          backgroundPosition: `${-tileIndex * sourceTileSizePx}px 0px`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}
