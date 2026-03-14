export interface Wire {
  wireId: string;
  x: number;
  y: number;
  direction:
    | "up"
    | "down"
    | "left"
    | "right"
    | "down-right"
    | "down-left"
    | "up-right"
    | "up-left"
    | "socket";
}
