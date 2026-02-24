export interface Laser {
  laserId: string;
  color: string;
  x: number;
  y: number;
  direction: "left" | "right" | "up" | "down";
  range: number;
}
