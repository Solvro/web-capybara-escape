import { useEffect, useRef, useState } from "react";

import { ASSETS } from "../../../constants/blocks";
import { layerNameToIndex } from "../../../constants/global";
import { MAX_DIM_CREATOR, MIN_DIM_CREATOR } from "../../../constants/global";
import type { LayerItem } from "../../../constants/layer-items";
import { Direction, type DirectionType } from "../../../types/direction";
import { clampDim } from "../creator-control/creator-control";
import { CreatorDimensionButtons } from "./creator-dimension-buttons";
import { CreatorTile } from "./creator-tile";

interface CreatorBoardProps {
  dims: [number, number];
  activeBlock: LayerItem | null;
  tileIndices: (LayerItem | null)[][];
  setTileIndices: React.Dispatch<React.SetStateAction<(LayerItem | null)[][]>>;
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
  const [isMouseOver, setMouseOver] = useState<{ row: number; col: number }>({
    row: -1,
    col: -1,
  });

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
    const next = Math.min(innerH / (rows + 1) - 6, innerW / cols - 4);
    setTileSize(Math.max(1, next));
  }, [boardHeight, boardWidth, rows, cols]);

  const boardRows = Array.from({ length: rows }, (_, rowIndex) => rowIndex);
  const boardCols = Array.from({ length: cols }, (_, colIndex) => colIndex);

  const handleBoardMouse = (
    e: React.MouseEvent<HTMLDivElement>,
  ): { row: number; col: number } => {
    if (!boardRef.current) return { row: -1, col: -1 };

    const position = boardRef.current.getBoundingClientRect();

    const left = (boardWidth - tileSize * cols) / 2;
    const top = (boardHeight - tileSize * rows) / 2;

    const x = e.clientX - position.left - left;
    const y = e.clientY - position.y - top;

    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize) == -1 ? 0 : Math.floor(y / tileSize);

    return { row: row, col: col };
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const { row, col } = handleBoardMouse(e);
    setMouseOver({ row: row, col: col });
  };

  const handleMouseLeave = () => {
    setMouseOver({ row: -1, col: -1 });
  };

  const handleTileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { row, col } = handleBoardMouse(e);
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return;
    }
    const tileIdx = row * cols + col;
    if (activeBlock) {
      const layerIdx = layerNameToIndex[activeBlock.layer];

      const valueToSet =
        activeBlock.frame === ASSETS.EMPTY ? null : activeBlock;

      if (layerIdx === undefined) return;
      setTileIndices((prev) => {
        const next = prev.map((arr) => [...arr]);
        if (layerIdx === 0) {
          next[tileIdx][0] = valueToSet;
        } else {
          for (let i = 1; i <= 4; i++) {
            next[tileIdx][i] = i === layerIdx ? valueToSet : null;
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

  const isRowsMin = rows <= MIN_DIM_CREATOR;
  const isRowsMax = rows >= MAX_DIM_CREATOR;
  const isColsMin = cols <= MIN_DIM_CREATOR;
  const isColsMax = cols >= MAX_DIM_CREATOR;

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { row, col } = handleBoardMouse(e);
    const tileIdx = row * cols + col;

    if (e.shiftKey) {
      setTileIndices((prev) => {
        const next = prev.map((arr) => [...arr]);
        next[tileIdx] = [null, null, null, null, null];
        return next;
      });
    } else if (activeBlock) {
      const layerIdx = layerNameToIndex[activeBlock.layer];
      if (layerIdx === undefined) return;

      setTileIndices((prev) => {
        const next = prev.map((arr) => [...arr]);
        next[tileIdx][layerIdx] = null;
        return next;
      });
    }
  };

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
            boxSizing: "border-box",
          }}
        >
          {boardRows.map((row) =>
            boardCols.map((col) => {
              const tileIdx = row * cols + col;
              return (
                <div
                  key={`${row}-${col}`}
                  onClick={handleTileClick}
                  onMouseMove={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                  onContextMenu={handleRightClick}
                  style={{
                    cursor: activeBlock ? "pointer" : undefined,
                    boxSizing: "border-box",
                    filter:
                      isMouseOver.col == col && isMouseOver.row == row
                        ? "brightness(1.3)"
                        : "",
                  }}
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
