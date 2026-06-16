import { Minus, Plus } from "lucide-react";

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
          type="button"
          onClick={() => onChange(-1)}
          disabled={isColsMin}
          aria-label="Decrease columns"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-violet-300/40 bg-violet-500/70 text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
        >
          <Minus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </button>
        <span className="w-8 text-center text-base font-bold text-amber-300">
          {cols}
        </span>
        <button
          type="button"
          onClick={() => onChange(1)}
          disabled={isColsMax}
          aria-label="Increase columns"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-violet-300/40 bg-violet-500/70 text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </div>
  );
}
