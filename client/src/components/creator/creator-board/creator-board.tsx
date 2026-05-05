import { useEffect, useRef, useState } from "react";

import { LAYER_NAMES } from "../../../constants/global";
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
    const el = boardRef.current;
    if (!el) return;

    const updateFromObserver = () => {
      const { width, height } = el.getBoundingClientRect();
      setBoardWidth(width);
      setBoardHeight(height);
    };

    updateFromObserver();
    const ro = new ResizeObserver(updateFromObserver);
    ro.observe(el);
    window.addEventListener("orientationchange", updateFromObserver);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", updateFromObserver);
    };
  }, []);

  useEffect(() => {
    if (!boardHeight || !boardWidth) return;
    const innerW = Math.max(0, boardWidth - 32);
    const innerH = Math.max(0, boardHeight - 32);
    const next = Math.min(innerH / rows - 6, innerW / cols - 4);
    setTileSize(Math.max(1, next));
  }, [boardHeight, boardWidth, rows, cols]);

  const boardRows = Array.from({ length: rows }, (_, rowIndex) => rowIndex);
  const boardCols = Array.from({ length: cols }, (_, colIndex) => colIndex);

  const handleTileClick = (tileIdx: number) => {
    if (activeBlock) {
      const layerNameToIndex: Record<string, number> = {
        [LAYER_NAMES.BACKGROUND]: 0,
        [LAYER_NAMES.FLOOR_DECOYS]: 1,
        [LAYER_NAMES.ENTITIES]: 2,
        [LAYER_NAMES.WALL_DECOYS]: 3,
      };
      const layerIdx = layerNameToIndex[activeBlock.layer];
      if (layerIdx === undefined) return;
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
