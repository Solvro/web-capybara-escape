import type { SpriteAnimatorConfig } from "./sprite-animator";
import { SpriteAnimator } from "./sprite-animator";

const PLAYER_ANIM_CONFIG: SpriteAnimatorConfig = {
  frameWidth: 64,
  frameHeight: 64,
  animations: [
    { name: "walk-up", startFrame: 0, endFrame: 3, frameRate: 8, loop: true },
    { name: "walk-down", startFrame: 4, endFrame: 7, frameRate: 8, loop: true },
    {
      name: "walk-left",
      startFrame: 8,
      endFrame: 11,
      frameRate: 8,
      loop: true,
    },
    {
      name: "walk-right",
      startFrame: 12,
      endFrame: 15,
      frameRate: 8,
      loop: true,
    },
  ],
};

export const PLAYER_TEXTURE_KEYS = [
  "player1",
  "player2",
  "player3",
  "player4",
] as const;

export function createPlayerAnimators(): SpriteAnimator[] {
  return PLAYER_TEXTURE_KEYS.map(
    (textureKey) => new SpriteAnimator(textureKey, PLAYER_ANIM_CONFIG),
  );
}

export function getPlayerAnimator(
  animators: SpriteAnimator[],
  playerIndex: number,
): SpriteAnimator {
  const index = Math.max(0, Math.min(playerIndex, animators.length - 1));
  return animators[index];
}

export function getPlayerTextureKey(playerIndex: number): string {
  const index = Math.max(
    0,
    Math.min(playerIndex, PLAYER_TEXTURE_KEYS.length - 1),
  );
  return PLAYER_TEXTURE_KEYS[index];
}
