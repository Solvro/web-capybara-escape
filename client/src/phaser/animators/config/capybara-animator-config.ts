import type { SpriteAnimatorConfig } from "../sprite-animator";

const CAPYBARA_FRAME_WIDTH = 24;
const CAPYBARA_FRAME_HEIGHT = 24;

export const CAPYBARA_ANIM_CONFIG: SpriteAnimatorConfig = {
  frameWidth: CAPYBARA_FRAME_WIDTH,
  frameHeight: CAPYBARA_FRAME_HEIGHT,
  spriteOffset: { x: 0, y: 0 },
  animations: [
    { name: "walk-down", startFrame: 4, endFrame: 7, frameRate: 8, loop: true },
    {
      name: "idle-down",
      startFrame: 4,
      endFrame: 4,
      frameRate: 1,
      loop: false,
    },
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
      startFrame: 12,
      endFrame: 12,
      frameRate: 1,
      loop: false,
    },
    {
      name: "walk-left",
      startFrame: 16,
      endFrame: 19,
      frameRate: 8,
      loop: true,
    },
    {
      name: "idle-left",
      startFrame: 16,
      endFrame: 16,
      frameRate: 1,
      loop: false,
    },
    {
      name: "jump",
      startFrame: 0,
      endFrame: 3,
      frameRate: 2,
      loop: false,
    },
  ],
};
