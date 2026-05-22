import { Minus, Plus } from "lucide-react";

interface CreatorDimensionButtonsProps {
  dimension: number;
  isDimensionMin: boolean;
  isDimensionMax: boolean;
  vertical?: boolean;
  dimensionAxis: "rows" | "cols";
  onChange: (delta: number) => void;
}

export function CreatorDimensionButtons({
  dimension,
  vertical,
  isDimensionMin,
  isDimensionMax,
  dimensionAxis,
  onChange,
}: CreatorDimensionButtonsProps) {
  const decreaseLabel =
    dimensionAxis === "rows"
      ? "Decrease number of rows"
      : "Decrease number of columns";
  const increaseLabel =
    dimensionAxis === "rows"
      ? "Increase number of rows"
      : "Increase number of columns";

  return (
    <div
      className={`${vertical ? "flex-col-reverse" : ""} flex items-center justify-center gap-3`}
    >
      <button
        type="button"
        onClick={() => onChange(-1)}
        disabled={isDimensionMin}
        aria-label={decreaseLabel}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-violet-300/40 bg-violet-500/70 text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
      >
        <Minus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
      </button>
      <span className="w-8 text-center text-base font-bold text-amber-300">
        {dimension}
      </span>
      <button
        type="button"
        onClick={() => onChange(1)}
        disabled={isDimensionMax}
        aria-label={increaseLabel}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-violet-300/40 bg-violet-500/70 text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );
}
