import { AUTO } from "phaser";

import { Main } from "./scenes/main";

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 640,
  height: 64 * 8.5,
  pixelArt: true,
  render: {
    antialias: false,
    pixelArt: true,
    antialiasGL: false,
    roundPixels: true,
  },
  parent: "game-container",
  backgroundColor: "#2f0d68",
  scene: [Main],
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  },
};
