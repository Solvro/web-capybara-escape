export const Direction = {
  TOP: 0,
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3,
} as const;

export type DirectionType = (typeof Direction)[keyof typeof Direction];
