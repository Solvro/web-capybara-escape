import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";
import type { Player } from "../entities/player";

export class SpeechBubble extends Phaser.GameObjects.Container {
  public scene: Phaser.Scene;
  private target: Player;
  private textureKey: string;
  private bubbleSprite: Phaser.GameObjects.Sprite;
  private bubbleText: Phaser.GameObjects.Text;
  private TOP_WIDTH!: number;
  private MIDDLE_HEIGHT!: number;
  private BOTTOM_HEIGHT!: number;
  private WIDTH!: number;
  constructor(
    scene: Phaser.Scene,
    target: Player,
    text: string,
    sessionId: string,
  ) {
    super(scene);
    this.scene = scene;
    this.target = target;
    this.textureKey = `speechBubble${sessionId}`;
    this.readDimensions();

    this.bubbleText = this.createText(text);
    this.bubbleSprite = this.generateSprite(
      this.bubbleText.getWrappedText().length - 1,
    ).setScale(SIZE_MULTIPLIER);

    this.bubbleText.setOrigin(0.5, 1);
    this.bubbleText.setPosition(
      CELL_SIZE * 1.2 + SIZE_MULTIPLIER / 2,
      -(CELL_SIZE * 0.4 + (this.BOTTOM_HEIGHT - 1) * SIZE_MULTIPLIER),
    );

    this.bubbleSprite.setOrigin(0.5, 1);
    this.bubbleSprite.setPosition(CELL_SIZE * 1.2, -(CELL_SIZE * 0.4));

    this.add(this.bubbleSprite);
    this.add(this.bubbleText);
    this.scene.add.existing(this);
    this.setDepth(this.target.depth + 100); //TEMP dopóki nie będzie jakiegoś systemu ogarniętego
  }

  preUpdate() {
    this.setX(this.target.x);
    this.setY(this.target.y);
  }

  private createText(text: string): Phaser.GameObjects.Text {
    const contents = this.scene.add.text(this.x, this.y, text, {
      fontFamily: "ArcadeClassic",
      fontSize: SIZE_MULTIPLIER * 2.5,
      color: "#000000",
      align: "center",
      lineSpacing: SIZE_MULTIPLIER * 0.5,
      wordWrap: { width: 35 * SIZE_MULTIPLIER },
    });
    return contents;
  }

  private generateSprite(textRows: number): Phaser.GameObjects.Sprite {
    this.scene.textures.remove(this.textureKey);
    const speechBubbleTexture = this.scene.textures.addDynamicTexture(
      this.textureKey,
      this.WIDTH,
      this.TOP_WIDTH + this.BOTTOM_HEIGHT + textRows * this.MIDDLE_HEIGHT,
    );
    if (speechBubbleTexture != null) {
      speechBubbleTexture.beginDraw();
      speechBubbleTexture.batchDrawFrame(
        "speech-bubble-sprite-sheet",
        "Top",
        0,
        0,
      );
      for (let row = 0; row < textRows; row++) {
        speechBubbleTexture.batchDrawFrame(
          "speech-bubble-sprite-sheet",
          "Middle",
          0,
          this.TOP_WIDTH + row * this.MIDDLE_HEIGHT,
        );
      }
      speechBubbleTexture.batchDrawFrame(
        "speech-bubble-sprite-sheet",
        "Bottom",
        0,
        this.TOP_WIDTH + textRows * this.MIDDLE_HEIGHT,
      );
      speechBubbleTexture.endDraw();
      const speechBubbleSprite = this.scene.add.sprite(
        0,
        0,
        speechBubbleTexture,
      );
      return speechBubbleSprite;
    }
    return this.scene.add.sprite(this.x, this.y, "crate"); //jeżeli fail to wyświetli się crate
  }

  private readDimensions() {
    this.WIDTH = this.scene.textures.getFrame(
      "speech-bubble-sprite-sheet",
      "Top",
    ).width;
    this.TOP_WIDTH = this.scene.textures.getFrame(
      "speech-bubble-sprite-sheet",
      "Top",
    ).height;
    this.MIDDLE_HEIGHT = this.scene.textures.getFrame(
      "speech-bubble-sprite-sheet",
      "Middle",
    ).height;
    this.BOTTOM_HEIGHT = this.scene.textures.getFrame(
      "speech-bubble-sprite-sheet",
      "Bottom",
    ).height;
  }
}
