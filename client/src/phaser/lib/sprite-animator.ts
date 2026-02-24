export interface AnimationDefinition {
  name: string;
  startFrame: number;
  endFrame: number;
  frameRate?: number;
  loop?: boolean;
}

export interface SpriteAnimatorConfig {
  frameWidth: number;
  frameHeight: number;
  animations: AnimationDefinition[];
}

export class SpriteAnimator {
  public readonly textureKey: string;
  public readonly config: SpriteAnimatorConfig;
  private registered = false;

  constructor(textureKey: string, config: SpriteAnimatorConfig) {
    this.textureKey = textureKey;
    this.config = config;
  }

  getAnimKey(animName: string): string {
    return `${this.textureKey}:${animName}`;
  }

  getIdleFrame(animName: string): number {
    const anim = this.config.animations.find((a) => a.name === animName);
    if (anim === undefined) {
      return 0;
    }
    return anim.startFrame;
  }

  register(scene: Phaser.Scene): void {
    if (this.registered) {
      return;
    }

    for (const anim of this.config.animations) {
      const key = this.getAnimKey(anim.name);

      if (scene.anims.exists(key)) {
        continue;
      }

      scene.anims.create({
        key,
        frames: scene.anims.generateFrameNumbers(this.textureKey, {
          start: anim.startFrame,
          end: anim.endFrame,
        }),
        frameRate: anim.frameRate ?? 8,
        repeat: anim.loop === false ? 0 : -1,
      });
    }

    this.registered = true;
  }

  play(sprite: Phaser.GameObjects.Sprite, animName: string): void {
    const key = this.getAnimKey(animName);
    sprite.play(key, true);
  }

  stop(
    sprite: Phaser.GameObjects.Sprite,
    animName: string,
    idleAnimName?: string,
  ): void {
    sprite.stop();
    if (idleAnimName !== undefined && this.hasAnimation(idleAnimName)) {
      this.play(sprite, idleAnimName);
    } else {
      sprite.setFrame(this.getIdleFrame(animName));
    }
  }

  hasAnimation(animName: string): boolean {
    return this.config.animations.some((a) => a.name === animName);
  }
}
