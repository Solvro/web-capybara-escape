import type { Direction } from "@capybara/shared";
import { useEffect, useRef, useState } from "react";

import { ASSETS } from "../../../constants/blocks";
import { layerNameToIndex } from "../../../constants/global";
import { MAX_DIM_CREATOR, MIN_DIM_CREATOR } from "../../../constants/global";
import {
  ENTITY_LIMITS,
  type LayerItem,
  getEntityLimitKeyFor,
} from "../../../constants/layer-items";
import { countEntityOccurrences } from "../../../utils/tileset-utils";
import { clampDim } from "../creator-control/creator-control";
import {
  type DelayConfig,
  EntityDelayModal,
} from "../creator-delay-modal/entity-delay-modal";
import { CreatorDimensionButtons } from "./creator-dimension-buttons";
import { CreatorTile } from "./creator-tile";

interface CreatorBoardProps {
  dims: [number, number];
  activeBlock: LayerItem | null;
  tileData: (string | null)[][];
  setTileData: React.Dispatch<React.SetStateAction<(string | null)[][]>>;
  setDims: (dims: [number, number]) => void;
  setDirection: (direction: Direction) => void;
  setEntityConfigs: React.Dispatch<
    React.SetStateAction<Record<number, DelayConfig>>
  >;
}

export function CreatorBoard({
  dims,
  activeBlock,
  tileData,
  setTileData,
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingEntity, setPendingEntity] = useState<{
    type: "laser" | "cable";
    tileIdx: number;
    layerIdx: number;
    valueToSet: string;
  } | null>(null);

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
        activeBlock.frame === ASSETS.EMPTY ? null : activeBlock.key;

      if (layerIdx === undefined) return;

      if (valueToSet !== null) {
        const limitKey = getEntityLimitKeyFor(valueToSet);
        if (limitKey) {
          const limit = ENTITY_LIMITS[limitKey]!;
          const currentCount = countEntityOccurrences(
            tileData,
            limitKey,
            tileIdx,
          );
          if (currentCount >= limit) {
            return;
          }
        }

        if (valueToSet.includes("laser") || valueToSet.includes("cable")) {
          setPendingEntity({
            type: valueToSet.includes("laser") ? "laser" : "cable",
            tileIdx,
            layerIdx,
            valueToSet,
          });
          setIsModalOpen(true);
          return;
        }
      }

      setTileData((prev) => {
        const next = prev.map((arr) => [...arr]);
        next[tileIdx][layerIdx] = valueToSet;
        return next;
      });
    }
  };

  const handleModalSave = (config: DelayConfig) => {
    if (!pendingEntity) return;

    setTileData((prev) => {
      const next = prev.map((arr) => [...arr]);
      next[pendingEntity.tileIdx][pendingEntity.layerIdx] =
        pendingEntity.valueToSet;
      return next;
    });

    console.log("Zapisano config dla tileIdx:", pendingEntity.tileIdx, config);

    setIsModalOpen(false);
    setPendingEntity(null);
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
      setTileData((prev) => {
        const next = prev.map((arr) => [...arr]);
        next[tileIdx] = [null, null, null, null, null];
        return next;
      });
    } else if (activeBlock) {
      const layerIdx = layerNameToIndex[activeBlock.layer];
      if (layerIdx === undefined) return;

      setTileData((prev) => {
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
        dimensionAxis="rows"
        dimension={rows}
        onChange={(e) => {
          handleRowsChange(e);
          setDirection("up");
        }}
        isDimensionMax={isRowsMax}
        isDimensionMin={isRowsMin}
      />
      <div className="flex w-full items-center flex-1">
        <CreatorDimensionButtons
          dimensionAxis="cols"
          vertical
          dimension={cols}
          onChange={(e) => {
            handleColsChange(e);
            setDirection("left");
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
                  <CreatorTile sizePx={tileSize} tileKeys={tileData[tileIdx]} />
                </div>
              );
            }),
          )}
        </div>
        <CreatorDimensionButtons
          dimensionAxis="cols"
          vertical
          dimension={cols}
          onChange={(e) => {
            handleColsChange(e);
            setDirection("right");
          }}
          isDimensionMax={isColsMax}
          isDimensionMin={isColsMin}
        />
      </div>
      <CreatorDimensionButtons
        dimensionAxis="rows"
        dimension={rows}
        onChange={(e) => {
          handleRowsChange(e);
          setDirection("down");
        }}
        isDimensionMax={isRowsMax}
        isDimensionMin={isRowsMin}
      />

      <EntityDelayModal
        isOpen={isModalOpen}
        entityType={pendingEntity?.type || null}
        onSave={handleModalSave}
        onCancel={() => {
          setIsModalOpen(false);
          setPendingEntity(null);
        }}
      />
    </div>
  );
}
