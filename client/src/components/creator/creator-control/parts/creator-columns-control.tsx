interface CreatorColumnsControlProps {
  cols: number;
  isColsMin: boolean;
  isColsMax: boolean;
  onChange: (delta: number) => void;
}

export function CreatorColumnsControl({
  cols,
  isColsMin,
  isColsMax,
  onChange,
}: CreatorColumnsControlProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="w-16 text-xs font-semibold text-violet-200 uppercase">
        Cols
      </label>
      <div className="ml-2 flex items-center gap-3">
        <button
          onClick={() => onChange(-1)}
          disabled={isColsMin}
          className="h-8 w-8 rounded-md border border-violet-300/40 bg-violet-500/70 font-bold text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
        >
          −
        </button>
        <span className="w-8 text-center text-base font-bold text-amber-300">
          {cols}
        </span>
        <button
          onClick={() => onChange(1)}
          disabled={isColsMax}
          className="h-8 w-8 rounded-md border border-violet-300/40 bg-violet-500/70 font-bold text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
        >
          +
        </button>
      </div>
    </div>
  );
}
