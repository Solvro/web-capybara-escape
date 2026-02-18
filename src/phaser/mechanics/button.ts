import { ASSETS, SCALE_FACTOR } from "../lib/const";
import { Mechanic } from "./mechanic";

export class Button extends Mechanic {
  public readonly buttonId: string;
  public readonly color: string;
  private pressed: boolean;
  private pressedFrameKey: number;
  private releasedFrameKey: number;
  private baseSprite: Phaser.GameObjects.Sprite;

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

    this.baseSprite = this.scene.add.sprite(
      0,
      0,
      "tileset",
      ASSETS.BUTTON_BASE,
    );
    this.baseSprite.setScale(SCALE_FACTOR);
    this.add(this.baseSprite);
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
  }
}
