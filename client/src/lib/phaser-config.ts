import * as Phaser from "phaser";

import { MONITOR_ASPECT } from "@/components/loading-animator-wrapper/constants";
import { CELL_SIZE } from "@/constants/global";
import { Main } from "@/phaser/scenes/main";

const INITIAL_WIDTH = CELL_SIZE * 12;
const INITIAL_HEIGHT = Math.round(INITIAL_WIDTH / MONITOR_ASPECT);

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: INITIAL_WIDTH,
  height: INITIAL_HEIGHT,
  pixelArt: true,
  transparent: true,
  fps: {
    target: 60,
    forceSetTimeOut: false,
  },
  render: {
    antialias: false,
    pixelArt: true,
    antialiasGL: false,
    roundPixels: true,
    transparent: true,
  },
  parent: "game-container",
  scene: [Main],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
