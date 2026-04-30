import { Direction, type DirectionType } from "../../../types/direction";
import { CreatorActionButtons } from "./parts/creator-action-buttons";
import { CreatorColumnsControl } from "./parts/creator-columns-control";
import { CreatorRowsControl } from "./parts/creator-rows-control";

interface CreatorControlProps {
  dims: [number, number];
  setDims: (dims: [number, number]) => void;
  onReset?: () => void;
  setDirection: (direction: DirectionType) => void;
}

export const MIN_DIM = 3;
export const MAX_DIM = 12;

export const clampDim = (value: number) => {
  return Math.min(MAX_DIM, Math.max(MIN_DIM, value));
};

export function CreatorControl({
  dims,
  setDims,
  setDirection,
  onReset,
}: CreatorControlProps) {
  const [rows, cols] = dims;

  const handleRowsChange = (delta: number) => {
    const newRows = clampDim(rows + delta);
    setDirection(Direction.BOTTOM);
    setDims([newRows, cols]);
  };

  const handleColsChange = (delta: number) => {
    const newCols = clampDim(cols + delta);
    setDirection(Direction.RIGHT);
    setDims([rows, newCols]);
  };

  const isRowsMin = rows <= MIN_DIM;
  const isRowsMax = rows >= MAX_DIM;
  const isColsMin = cols <= MIN_DIM;
  const isColsMax = cols >= MAX_DIM;

  return (
    <div className="relative flex h-full w-full items-center gap-6 rounded-lg bg-[#4b2a86] p-4 shadow-lg">
      <div className="flex flex-col gap-3">
        <CreatorRowsControl
          rows={rows}
          isRowsMin={isRowsMin}
          isRowsMax={isRowsMax}
          onChange={handleRowsChange}
        />
        <CreatorColumnsControl
          cols={cols}
          isColsMin={isColsMin}
          isColsMax={isColsMax}
          onChange={handleColsChange}
        />
      </div>

      <CreatorActionButtons onReset={onReset} />
    </div>
  );
}
