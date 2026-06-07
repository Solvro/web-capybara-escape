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

  start() {
    this.running = true;
  }

  reset() {
    this.running = false;
    this.elapsedMs = 0;
    this.emit();
  }

  get elapsed() {
    return this.elapsedMs;
  }

  tick(delta: number) {
    if (!this.running) {
      return;
    }
    this.elapsedMs += delta;
    this.emit();
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
