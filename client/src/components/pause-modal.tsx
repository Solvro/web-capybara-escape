export function PauseModal() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/60">
      <div className="arcade-font text-5xl text-white">GRA ZATRZYMANA</div>
      <div className="arcade-font text-xl text-white">
        Naciśnij P, aby wznowić...
      </div>
    </div>
  );
}
