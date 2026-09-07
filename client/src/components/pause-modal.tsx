interface PauseModalProps {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onRestart?: () => void;
}

export function PauseModal({
  title = "GRA ZATRZYMANA",
  subtitle = "Naciśnij P, aby wznowić...",
  actionLabel = "Zagraj od początku",
  onRestart,
}: PauseModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/80">
      <div className="arcade-font text-lg text-white">{title}</div>
      <div className="arcade-font text-md text-white">{subtitle}</div>

      {onRestart && (
        <button
          onClick={onRestart}
          className="arcade-font cursor-pointer rounded-lg bg-violet-600 px-6 py-3 text-lg text-white hover:bg-violet-500 active:scale-95 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
