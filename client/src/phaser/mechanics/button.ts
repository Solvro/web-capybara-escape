import { ASSETS } from "../../constants/blocks";
import { SIZE_MULTIPLIER } from "../../constants/global";
import type { Button as ButtonType } from "../../types/button";
import type { INetworkInterface } from "../../types/network-interface";
import { Mechanic } from "./mechanic";

export class Button extends Mechanic implements INetworkInterface<ButtonType> {
  public readonly buttonId: string;
  public readonly networkId: string | number;
  public readonly color: string;
  private pressed: boolean;
  private pressedFrameKey: number = ASSETS.BUTTON_PRESSED;
  private releasedFrameKey: number = ASSETS.BUTTON_RELEASED;
  private baseSprite: Phaser.GameObjects.Sprite;
  private borderSprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, data: ButtonType) {
    super(
      scene,
      data.x,
      data.y,
      data.pressed ? ASSETS.BUTTON_PRESSED : ASSETS.BUTTON_RELEASED,
      true,
      data.color,
    );
    this.buttonId = data.buttonId;
    this.networkId = data.buttonId;
    this.color = data.color;
    this.pressed = data.pressed;

    this.baseSprite = this.scene.add
      .sprite(0, 0, "tileset", ASSETS.BUTTON_BASE)
      .setScale(SIZE_MULTIPLIER);
    this.borderSprite = this.scene.add
      .sprite(0, 0, "tileset", ASSETS.POINT_BUTTON)
      .setScale(SIZE_MULTIPLIER);

    this.borderSprite.setTint(
      Phaser.Display.Color.HexStringToColor(data.color).color,
    );
    this.borderSprite.setVisible(this.pressed);

    this.add(this.baseSprite);
    this.add(this.borderSprite);
    this.sendToBack(this.baseSprite);
  }

  public syncState(data: Partial<ButtonType>): void {
    if (data.pressed !== undefined) {
      this.isPressed = data.pressed;
    }
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
