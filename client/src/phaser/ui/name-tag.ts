import * as Phaser from "phaser";

import type { Player } from "@/phaser/entities/player";

import { CELL_SIZE } from "../../constants/global";

const PADDING_X = 10;
const PADDING_Y = 10;
const FONT_SIZE = 18;
const CORNER_RADIUS = 8;
const GAP_ABOVE_HEAD = 10;
const BORDER_WIDTH = 2;

const NAME_TAG_COLORS = {
  local: { background: "#7F00FF", text: "#FFFFFF" },
  remote: { background: "#FFFFFF", text: "#000000" },
} as const;

export class NameTag extends Phaser.GameObjects.Container {
  private target: Player;
  private readonly yOffset: number;

  constructor(scene: Phaser.Scene, target: Player, name: string) {
    super(scene);
    this.target = target;

    const colors = target.isLocal
      ? NAME_TAG_COLORS.local
      : NAME_TAG_COLORS.remote;

    const text = scene.add.text(0, 0, name, {
      fontFamily: "ArcadeClassic",
      fontSize: FONT_SIZE,
      color: colors.text,
      align: "center",
    });
    text.setOrigin(0.5, 0.5);

    const width = text.width + PADDING_X * 2;
    const height = text.height + PADDING_Y * 2;

    const background = scene.add.graphics();
    background.fillStyle(
      Phaser.Display.Color.HexStringToColor(colors.background).color,
      1,
    );
    background.fillRoundedRect(
      -width / 2,
      -height / 2,
      width,
      height,
      CORNER_RADIUS,
    );
    background.lineStyle(
      BORDER_WIDTH,
      Phaser.Display.Color.HexStringToColor(colors.text).color,
      1,
    );
    background.strokeRoundedRect(
      -width / 2,
      -height / 2,
      width,
      height,
      CORNER_RADIUS,
    );

    this.yOffset = -(CELL_SIZE / 2) - height / 2 - GAP_ABOVE_HEAD;

    this.add(background);
    this.add(text);
    this.setPosition(target.x, target.y + this.yOffset);
  }

  preUpdate() {
    this.setPosition(this.target.x, this.target.y + this.yOffset);
  }
}
