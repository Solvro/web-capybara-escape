import type { SpriteAnimatorConfig } from "../sprite-animator";

const SOL_FRAME_WIDTH = 24;
const SOL_FRAME_HEIGHT = 30;

export const SOL_ANIM_CONFIG: SpriteAnimatorConfig = {
  frameWidth: SOL_FRAME_WIDTH,
  frameHeight: SOL_FRAME_HEIGHT,
  spriteOffset: { x: 0, y: -3 },
  animations: [
    { name: "walk-down", startFrame: 0, endFrame: 3, frameRate: 8, loop: true },
    { name: "idle-down", startFrame: 4, endFrame: 6, frameRate: 4, loop: true },
    { name: "walk-up", startFrame: 8, endFrame: 11, frameRate: 8, loop: true },
    { name: "idle-up", startFrame: 8, endFrame: 8, frameRate: 1, loop: false },
    {
      name: "walk-right",
      startFrame: 12,
      endFrame: 15,
      frameRate: 8,
      loop: true,
    },
    {
      name: "idle-right",
      startFrame: 16,
      endFrame: 18,
      frameRate: 4,
      loop: true,
    },
    {
      name: "walk-left",
      startFrame: 20,
      endFrame: 23,
      frameRate: 8,
      loop: true,
    },
    {
      name: "idle-left",
      startFrame: 24,
      endFrame: 26,
      frameRate: 4,
      loop: true,
    },
  ],
};
