import type { SpriteAnimatorConfig } from "@/types/animators/sprite-animator";

const ENEMY_FRAME_WIDTH = 24;
const ENEMY_FRAME_HEIGHT = 24;

export const ENEMY_ANIM_CONFIG: SpriteAnimatorConfig = {
  frameWidth: ENEMY_FRAME_WIDTH,
  frameHeight: ENEMY_FRAME_HEIGHT,
  spriteOffset: { x: 0, y: 0 },
  animations: [
    { name: "walk-down", startFrame: 0, endFrame: 3, frameRate: 8, loop: true },
    { name: "idle-down", startFrame: 0, endFrame: 3, frameRate: 8, loop: true },
    { name: "walk-up", startFrame: 0, endFrame: 3, frameRate: 8, loop: true },
    { name: "idle-up", startFrame: 0, endFrame: 3, frameRate: 8, loop: true },
    {
      name: "walk-right",
      startFrame: 0,
      endFrame: 3,
      frameRate: 8,
      loop: true,
    },
    {
      name: "idle-right",
      startFrame: 0,
      endFrame: 3,
      frameRate: 8,
      loop: true,
    },
    { name: "walk-left", startFrame: 0, endFrame: 3, frameRate: 8, loop: true },
    { name: "idle-left", startFrame: 0, endFrame: 3, frameRate: 8, loop: true },
  ],
};
