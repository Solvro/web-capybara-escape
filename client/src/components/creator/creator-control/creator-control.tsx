interface CreatorControlProps {
  dims: [number, number];
  setDims: (dims: [number, number]) => void;
}

export function CreatorControl({ dims, setDims }: CreatorControlProps) {
  const [rows, cols] = dims;
  const MIN_DIM = 3;
  const MAX_DIM = 12;

  const clampDim = (value: number) =>
    Math.min(MAX_DIM, Math.max(MIN_DIM, value));

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
    <div className="flex h-full items-center gap-6 rounded-lg bg-[#4b2a86] py-4 pr-4 pl-6 shadow-lg">
      <div className="flex flex-col gap-3">
        {/* Rows Control */}
        <div className="flex items-center gap-3">
          <label className="w-16 text-xs font-semibold text-violet-200 uppercase">
            Rows
          </label>
          <div className="ml-2 flex items-center gap-3">
            <button
              onClick={() => handleRowsChange(-1)}
              disabled={isRowsMin}
              className="h-8 w-8 rounded-md border border-violet-300/40 bg-violet-500/70 font-bold text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
            >
              −
            </button>
            <span className="w-8 text-center text-base font-bold text-amber-300">
              {rows}
            </span>
            <button
              onClick={() => handleRowsChange(1)}
              disabled={isRowsMax}
              className="h-8 w-8 rounded-md border border-violet-300/40 bg-violet-500/70 font-bold text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
            >
              +
            </button>
          </div>
        </div>

        {/* Columns Control */}
        <div className="flex items-center gap-3">
          <label className="w-16 text-xs font-semibold text-violet-200 uppercase">
            Cols
          </label>
          <div className="ml-2 flex items-center gap-3">
            <button
              onClick={() => handleColsChange(-1)}
              disabled={isColsMin}
              className="h-8 w-8 rounded-md border border-violet-300/40 bg-violet-500/70 font-bold text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
            >
              −
            </button>
            <span className="w-8 text-center text-base font-bold text-amber-300">
              {cols}
            </span>
            <button
              onClick={() => handleColsChange(1)}
              disabled={isColsMax}
              className="h-8 w-8 rounded-md border border-violet-300/40 bg-violet-500/70 font-bold text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="ml-auto flex items-center gap-2">
        <button className="rounded-md bg-violet-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-violet-400">
          Reset
        </button>
        <button className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-400">
          Create
        </button>
      </div>
    </div>
  );
}
