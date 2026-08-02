export type Direction = "left" | "right" | "up" | "down";

export type WireDirection =
  | Direction
  | "down-right"
  | "down-left"
  | "up-right"
  | "up-left"
  | "socket";
