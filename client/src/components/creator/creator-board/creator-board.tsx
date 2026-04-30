import { useEffect, useRef, useState } from "react";

import { LAYER_NAMES } from "../../../constants/global";
import type { LayerItem } from "../../../constants/layer-items";
import { Direction, type DirectionType } from "../../../types/direction";
import { MAX_DIM, MIN_DIM, clampDim } from "../creator-control/creator-control";
import { CreatorDimensionButtons } from "./creator-dimension-buttons";
import { CreatorTile } from "./creator-tile";

interface CreatorBoardProps {
  dims: [number, number];
  activeBlock: LayerItem | null;
  tileIndices: (number | null)[][];
  setTileIndices: React.Dispatch<React.SetStateAction<(number | null)[][]>>;
  setDims: (dims: [number, number]) => void;
  setDirection: (direction: DirectionType) => void;
}

export function CreatorBoard({
  dims,
  activeBlock,
  tileIndices,
  setTileIndices,
  setDims,
  setDirection,
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

  const handleRowsChange = (delta: number) => {
    const newRows = clampDim(rows + delta);
    setDims([newRows, cols]);
  };

  const handleColsChange = (delta: number) => {
    const newCols = clampDim(cols + delta);
    setDims([rows, newCols]);
  };

  const isRowsMin = rows <= MIN_DIM;
  const isRowsMax = rows >= MAX_DIM;
  const isColsMin = cols <= MIN_DIM;
  const isColsMax = cols >= MAX_DIM;

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full overflow-hidden rounded-lg bg-[#4b2a86] p-4 shadow-lg"
      ref={boardRef}
    >
      <CreatorDimensionButtons
        dimension={rows}
        onChange={(e) => {
          handleRowsChange(e);
          setDirection(Direction.TOP);
        }}
        isDimensionMax={isRowsMax}
        isDimensionMin={isRowsMin}
      />
      <div className="flex w-full items-center flex-1">
        <CreatorDimensionButtons
          vertical
          dimension={cols}
          onChange={(e) => {
            handleColsChange(e);
            setDirection(Direction.LEFT);
          }}
          isDimensionMax={isColsMax}
          isDimensionMin={isColsMin}
        />
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
        <CreatorDimensionButtons
          vertical
          dimension={cols}
          onChange={(e) => {
            handleColsChange(e);
            setDirection(Direction.RIGHT);
          }}
          isDimensionMax={isColsMax}
          isDimensionMin={isColsMin}
        />
      </div>
      <CreatorDimensionButtons
        dimension={rows}
        onChange={(e) => {
          handleRowsChange(e);
          setDirection(Direction.BOTTOM);
        }}
        isDimensionMax={isRowsMax}
        isDimensionMin={isRowsMin}
      />
    </div>
  );
}
