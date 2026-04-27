interface CreatorActionButtonsProps {
  onReset?: () => void;
}

export function CreatorActionButtons({ onReset }: CreatorActionButtonsProps) {
  return (
    <div className="creator-control-actions ml-auto flex flex-col gap-2 md:flex-row">
      <button
        className="h-8 min-w-[70px] rounded-md bg-violet-500 px-3 py-1 text-[0.8rem] font-semibold text-white transition-colors hover:bg-violet-400"
        onClick={onReset}
      >
        Reset
      </button>
      <button className="h-8 min-w-[70px] rounded-md bg-emerald-500 px-3 py-1 text-[0.8rem] font-semibold text-white transition-colors hover:bg-emerald-400">
        Create
      </button>
    </div>
  );
}
