interface CreatorTileProps {
  sizePx: number;
}

export function CreatorTile({ sizePx }: CreatorTileProps) {
  return (
    <div
      className="border-4 border-emerald-950 bg-blue-400"
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
      }}
    >
      C
    </div>
  );
}
