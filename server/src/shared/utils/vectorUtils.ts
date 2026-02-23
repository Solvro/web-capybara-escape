export type Direction = "left" | "right" | "up" | "down";

export const getMoveVectorFromDirection = (direction: Direction) => {
  const vectors: Record<Direction, { dx: number; dy: number }> = {
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 },
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
  };
  return vectors[direction] || { dx: 0, dy: 0 };
};

export const getDirectionFromMoveVector = (
  dx: number,
  dy: number
): Direction => {
  if (dx === -1 && dy === 0) return "left";
  if (dx === 1 && dy === 0) return "right";
  if (dx === 0 && dy === -1) return "up";
  if (dx === 0 && dy === 1) return "down";
};
