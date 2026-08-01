interface PauseModalProps {
  title?: string;
  subtitle?: string;
  onRestart?: () => void;
}

export function PauseModal({
  title = "GRA ZATRZYMANA",
  subtitle = "Naciśnij P, aby wznowić...",
  onRestart,
}: PauseModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/80">
      <div className="arcade-font text-5xl text-white">{title}</div>
      <div className="arcade-font text-xl text-white">{subtitle}</div>

      {onRestart && (
        <button
          onClick={onRestart}
          className="arcade-font cursor-pointer rounded-lg bg-violet-600 px-6 py-3 text-lg text-white hover:bg-violet-500 active:scale-95 transition-all"
        >
          Zagraj od początku
        </button>
      )}
    </div>
  );
}
