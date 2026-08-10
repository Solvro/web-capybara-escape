export const STOPWATCH_EVENT = "stopwatch:update";

export type StopwatchListener = (display: string) => void;

export class Stopwatch {
  private elapsedMs = 0;
  private running = false;
  private listener: StopwatchListener;

  constructor(listener: StopwatchListener) {
    this.listener = listener;
    this.emit();
  }

  sync(elapsedMs: number, running: boolean) {
    this.elapsedMs = elapsedMs;
    this.running = running;
    this.emit();
  }

  tick(delta: number) {
    if (!this.running) {
      return;
    }
    this.elapsedMs += delta;
    this.emit();
  }

  get elapsed() {
    return this.elapsedMs;
  }

  static format(elapsedMs: number) {
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const pad = (value: number) => value.toString().padStart(2, "0");
    return `${pad(minutes)}:${pad(seconds)}`;
  }

  private emit() {
    this.listener(Stopwatch.format(this.elapsedMs));
  }
}
