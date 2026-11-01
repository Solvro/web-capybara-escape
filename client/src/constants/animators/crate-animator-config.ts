import type { SpriteAnimatorConfig } from "@/types/animators/sprite-animator";

const CRATE_FRAME_WIDTH = 24;
const CRATE_FRAME_HEIGHT = 24;

export const CRATE_ANIM_CONFIG: SpriteAnimatorConfig = {
  frameWidth: CRATE_FRAME_WIDTH,
  frameHeight: CRATE_FRAME_HEIGHT,
  spriteOffset: { x: 0, y: 0 },
  animations: [
    { name: "burn-up", startFrame: 0, endFrame: 7, frameRate: 8, loop: false },
    { name: "idle", startFrame: 0, endFrame: 0, frameRate: 0, loop: true },
  ],
};
