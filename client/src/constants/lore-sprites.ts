export interface LorePoseSprite {
  src: string;
  scaleX: number;
  scaleY: number;
  offsetX: number;
  offsetY: number;
}

const illustrations = import.meta.env.BASE_URL + "illustrations/";

export const LORE_SPRITES: Record<string, LorePoseSprite> = {
  vron_based: {
    src: `${illustrations}vron-based.png`,
    scaleX: 1.4,
    scaleY: 1.4,
    offsetX: 0,
    offsetY: 0,
  },
  vron_cocktail: {
    src: `${illustrations}vron-cocktail.png`,
    scaleX: 1.2,
    scaleY: 1.2,
    offsetX: 10,
    offsetY: 0,
  },
  vron_rat: {
    src: `${illustrations}vron-rat.png`,
    scaleX: 1.4,
    scaleY: 1.4,
    offsetX: 0,
    offsetY: 0,
  },
  sol_happy: {
    src: `${illustrations}sol-happy.png`,
    scaleX: 2,
    scaleY: 2,
    offsetX: 0,
    offsetY: -10,
  },
};

export const LORE_BACKGROUNDS: Record<string, string> = {
  server_room: `${illustrations}background-lore-screen.png`,
};
