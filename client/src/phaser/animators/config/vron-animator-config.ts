import type { SpriteAnimatorConfig } from "../sprite-animator";

const VRON_FRAME_WIDTH = 24;
const VRON_FRAME_HEIGHT = 30;

export const VRON_ANIM_CONFIG: SpriteAnimatorConfig = {
  frameWidth: VRON_FRAME_WIDTH,
  frameHeight: VRON_FRAME_HEIGHT,
  spriteOffset: { x: 0, y: -3 },
  animations: [
    { name: "walk-down", startFrame: 0, endFrame: 5, frameRate: 8, loop: true },
    { name: "idle-down", startFrame: 6, endFrame: 8, frameRate: 4, loop: true },
    { name: "walk-up", startFrame: 12, endFrame: 17, frameRate: 8, loop: true },
    { name: "idle-up", startFrame: 18, endFrame: 21, frameRate: 4, loop: true },
    {
      name: "walk-right",
      startFrame: 24,
      endFrame: 29,
      frameRate: 8,
      loop: true,
    },
    {
      name: "idle-right",
      startFrame: 30,
      endFrame: 32,
      frameRate: 4,
      loop: true,
    },
    {
      name: "walk-left",
      startFrame: 36,
      endFrame: 41,
      frameRate: 8,
      loop: true,
    },
    {
      name: "idle-left",
      startFrame: 42,
      endFrame: 44,
      frameRate: 4,
      loop: true,
    },
  ],
};
