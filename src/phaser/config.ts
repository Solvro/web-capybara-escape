import { AUTO } from "phaser";

import { CELL_SIZE } from "../constants/global";
import { Main } from "./scenes/main";

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: CELL_SIZE * 10,
  height: CELL_SIZE * 8.5,
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
