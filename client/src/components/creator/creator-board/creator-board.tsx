import { useEffect, useRef, useState } from "react";

import { CreatorTile } from "./creator-tile";

interface CreatorBoardProps {
  dims: [number, number];
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

  console.log("Board size: ", boardWidth, boardHeight);
  console.log("Tile size: ", tileSize);

  const boardRows = Array.from({ length: rows }, (_, rowIndex) => rowIndex);
  const boardCols = Array.from({ length: cols }, (_, colIndex) => colIndex);

  return (
    <div
      className="h-[80vh] overflow-hidden rounded-lg bg-[#4b2a86] p-4 shadow-lg"
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
            boardCols.map((col) => (
              <CreatorTile key={`${row}-${col}`} sizePx={tileSize} />
            )),
          )}
        </div>
      </div>
    </div>
  );
}
