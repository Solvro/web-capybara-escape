import { ASSETS, SCALE_FACTOR, TILE_SIZE } from "../lib/const";

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

    this.sprite = this.scene.add.sprite(0, 0, "tileset", frameKey);
    this.sprite.setScale(SCALE_FACTOR);
    this.add(this.sprite);

    if (isColorized) {
      const colorInt = Phaser.Display.Color.HexStringToColor(color).color;
      this.sprite.setTint(colorInt);
    }

    this.setPosition(
      this.gridX * TILE_SIZE + TILE_SIZE / 2,
      this.gridY * TILE_SIZE + TILE_SIZE / 2,
    );

    this.setDepth(this.y - 0.5);
  }

  public setFrame(frameKey: number) {
    this.sprite.setFrame(frameKey);
  }
}
