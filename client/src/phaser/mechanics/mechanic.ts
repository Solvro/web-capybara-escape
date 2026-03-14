import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";

export class Mechanic extends Phaser.GameObjects.Container {
  protected sprite: Phaser.GameObjects.Sprite;
  protected gridX: number;
  protected gridY: number;

  constructor(
    scene: Phaser.Scene,
    gridX: number,
    gridY: number,
    frameKey = ASSETS.DOOR_OPEN,
    isColorized = false,
    color = "#ffffff",
  ) {
    super(scene);

    this.gridX = gridX;
    this.gridY = gridY;

    this.sprite = this.scene.add
      .sprite(0, 0, "tileset", frameKey)
      .setScale(SIZE_MULTIPLIER);
    this.add(this.sprite);

    if (isColorized) {
      const colorInt = Phaser.Display.Color.HexStringToColor(color).color;
      this.sprite.setTint(colorInt);
    }

    this.setPosition(
      this.gridX * CELL_SIZE + CELL_SIZE / 2,
      this.gridY * CELL_SIZE + CELL_SIZE / 2,
    );

    this.setDepth(0.5);
  }

  public setFrame(frameKey: number) {
    this.sprite.setFrame(frameKey);
  }
}
