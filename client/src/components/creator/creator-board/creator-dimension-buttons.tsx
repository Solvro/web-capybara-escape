interface CreatorRowsControlProps {
  dimension: number;
  isDimensionMin: boolean;
  isDimensionMax: boolean;
  vertical?: boolean;
  onChange: (delta: number) => void;
}

export function CreatorDimensionButtons({
  dimension,
  vertical,
  isDimensionMin,
  isDimensionMax,
  onChange,
}: CreatorRowsControlProps) {
  return (
    <div
      className={`${vertical && "flex-col-reverse"} flex justify-center items-center gap-3`}
    >
      <button
        onClick={() => onChange(-1)}
        disabled={isDimensionMin}
        className="h-8 w-8 rounded-md border border-violet-300/40 bg-violet-500/70 font-bold text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
      >
        −
      </button>
      <span className="w-8 text-center text-base font-bold text-amber-300">
        {dimension}
      </span>
      <button
        onClick={() => onChange(1)}
        disabled={isDimensionMax}
        className="h-8 w-8 rounded-md border border-violet-300/40 bg-violet-500/70 font-bold text-violet-50 transition-colors hover:bg-violet-400/80 disabled:cursor-not-allowed disabled:border-violet-300/20 disabled:bg-violet-300/30 disabled:text-violet-100/70"
      >
        +
      </button>
    </div>
  );
}
