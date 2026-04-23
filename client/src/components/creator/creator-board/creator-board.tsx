import { useEffect, useMemo, useRef, useState } from "react";

import { CreatorTile } from "./creator-tile";

interface CreatorBoardProps {
  dims: [number, number];
  activeBlock?: { key: string; frame: number; label: string } | null;
}

export function CreatorBoard({ dims }: CreatorBoardProps) {
  const boardRef = useRef<HTMLDivElement | null>(null);

  const [rows, cols] = dims;

  const [boardHeight, setBoardHeight] = useState<number>(0);
  const [boardWidth, setBoardWidth] = useState<number>(0);

  const [tileSize, setTileSize] = useState<number>(0);

  useEffect(() => {
    if (boardRef.current) {
      const { width, height } = boardRef.current.getBoundingClientRect();
      setBoardWidth(width);
      setBoardHeight(height);
    }
  }, []);

  useEffect(() => {
    if (!boardHeight || !boardWidth) return;
    const tileSize = Math.min(boardHeight / rows - 6, boardWidth / cols - 4);
    setTileSize(tileSize);
  }, [boardHeight, boardWidth, rows, cols]);

  const boardRows = Array.from({ length: rows }, (_, rowIndex) => rowIndex);
  const boardCols = Array.from({ length: cols }, (_, colIndex) => colIndex);

  const tileIndexes = useMemo(
    () =>
      Array.from({ length: rows * cols }, () => Math.floor(Math.random() * 4)),
    [rows, cols],
  );

  return (
    <div
      className="h-full overflow-hidden rounded-lg bg-[#4b2a86] p-4 shadow-lg"
      ref={boardRef}
    >
      <div className="flex min-h-full items-center">
        <div
          className="mx-auto grid w-fit"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
            gap: 0,
          }}
        >
          {boardRows.map((row) =>
            boardCols.map((col) => {
              const tileIdx = row * cols + col;
              return (
                <CreatorTile
                  key={`${row}-${col}`}
                  sizePx={tileSize}
                  tileIndex={tileIndexes[tileIdx]}
                />
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
