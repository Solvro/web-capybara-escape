import { useEffect, useMemo, useRef, useState } from "react";

import { LAYER_ORDER } from "../../../constants/layer-items";
import type { LayerItem } from "../../../constants/layer-items";
import { CreatorTile } from "./creator-tile";

interface CreatorBoardProps {
  dims: [number, number];
  activeBlock: LayerItem | null;
  tileIndices: (number | null)[][];
  setTileIndices: React.Dispatch<React.SetStateAction<(number | null)[][]>>;
}

export function CreatorBoard({
  dims,
  activeBlock,
  tileIndices,
  setTileIndices,
}: CreatorBoardProps) {
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

  const handleTileClick = (tileIdx: number) => {
    if (activeBlock) {
      const layerIdx = LAYER_ORDER.indexOf(
        activeBlock.layer as (typeof LAYER_ORDER)[number],
      );
      if (layerIdx === -1) return;
      setTileIndices((prev) => {
        const next = prev.map((arr) => [...arr]);

        if (layerIdx === 0) {
          next[tileIdx][0] = activeBlock.frame;
        } else {
          for (let i = 1; i <= 3; i++) {
            next[tileIdx][i] = i === layerIdx ? activeBlock.frame : null;
          }
        }
        return next;
      });
    }
  };

  return (
    <div
      className="h-full w-full overflow-hidden rounded-lg bg-[#4b2a86] p-4 shadow-lg"
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
                <div
                  key={`${row}-${col}`}
                  onClick={() => handleTileClick(tileIdx)}
                  style={{ cursor: activeBlock ? "pointer" : undefined }}
                >
                  <CreatorTile
                    sizePx={tileSize}
                    tileIndices={tileIndices[tileIdx]}
                  />
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
