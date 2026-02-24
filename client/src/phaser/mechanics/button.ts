import { ASSETS } from "../../constants/blocks";
import { SIZE_MULTIPLIER } from "../../constants/global";
import { Mechanic } from "./mechanic";

export class Button extends Mechanic {
  public readonly buttonId: string;
  public readonly color: string;
  private pressed: boolean;
  private pressedFrameKey: number;
  private releasedFrameKey: number;
  private baseSprite: Phaser.GameObjects.Sprite;
  private borderSprite: Phaser.GameObjects.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    buttonId: string,
    color: string,
    pressed = false,
    pressedFrameKey = ASSETS.BUTTON_PRESSED,
    releasedFrameKey = ASSETS.BUTTON_RELEASED,
  ) {
    super(
      scene,
      x,
      y,
      pressed ? pressedFrameKey : releasedFrameKey,
      true,
      color,
    );
    this.buttonId = buttonId;
    this.color = color;
    this.pressed = pressed;
    this.pressedFrameKey = pressedFrameKey;
    this.releasedFrameKey = releasedFrameKey;

    this.baseSprite = this.scene.add
      .sprite(0, 0, "tileset", ASSETS.BUTTON_BASE)
      .setScale(SIZE_MULTIPLIER);
    this.borderSprite = this.scene.add
      .sprite(0, 0, "tileset", ASSETS.POINT_BUTTON)
      .setScale(SIZE_MULTIPLIER);

    this.borderSprite.setTint(
      Phaser.Display.Color.HexStringToColor(color).color,
    );
    this.borderSprite.setVisible(this.pressed);

    this.add(this.baseSprite);
    this.add(this.borderSprite);
    this.sendToBack(this.baseSprite);
  }

  public get id(): string {
    return this.buttonId;
  }

  public get isPressed(): boolean {
    return this.pressed;
  }

  public set isPressed(value: boolean) {
    this.pressed = value;
    const frameKey = this.pressed
      ? this.pressedFrameKey
      : this.releasedFrameKey;
    this.setFrame(frameKey);
    this.borderSprite.setVisible(value);
  }
}
