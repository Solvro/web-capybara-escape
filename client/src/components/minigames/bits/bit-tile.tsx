interface BitTileProps {
  bit: number;
  switchBit: () => void;
}

export function BitTile({ bit, switchBit }: BitTileProps) {
  return (
    <button
      onClick={switchBit}
      className="h-16 w-16 rounded-xl border-3 border-white"
    >
      <h3 className="text-xl">{bit}</h3>
    </button>
  );
}
