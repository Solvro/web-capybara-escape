import type { Player } from "../entities/player";

export class SpeechBubble extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  target: Player;
  textureKey: string;
  bubbleSprite: Phaser.GameObjects.Sprite;
  bubbleText: Phaser.GameObjects.Text;
  height: number;
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

    this.bubbleText = this.createText(text);
    this.bubbleSprite = this.generateSprite(
      this.bubbleText.getWrappedText().length - 1,
    ).setScale(3);
    this.height = this.bubbleSprite.height;

    this.bubbleText.setOrigin(0.5, 1);
    this.bubbleText.setPosition(81, -47);

    this.bubbleSprite.setOrigin(0.5, 1);
    this.bubbleSprite.setPosition(80, -20);

    this.add(this.bubbleSprite);
    this.add(this.bubbleText);
    this.scene.add.existing(this);
  }

  preUpdate() {
    this.setX(this.target.x);
    this.setY(this.target.y);
  }

  createText(text: string): Phaser.GameObjects.Text {
    const contents = this.scene.add.text(this.x, this.y, text, {
      fontFamily: "ArcadeClassic",
      fontSize: "8px",
      color: "#000000",
      align: "center",
      lineSpacing: 2,
      wordWrap: { width: 110 },
    });
    return contents;
  }

  generateSprite(textRows: number): Phaser.GameObjects.Sprite {
    this.scene.textures.remove(this.textureKey);
    const speechBubbleTexture = this.scene.textures.addDynamicTexture(
      this.textureKey,
      44,
      17 + textRows * 3,
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
          7 + row * 3,
        );
      }
      speechBubbleTexture.batchDrawFrame(
        "speech-bubble-sprite-sheet",
        "Bottom",
        0,
        7 + textRows * 3,
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
}
