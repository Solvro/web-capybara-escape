export interface AnimationDefinition {
  name: string;
  startFrame: number;
  endFrame: number;
  frameRate?: number;
  loop?: boolean;
}

export interface SpriteOffset {
  x: number;
  y: number;
}

export interface SpriteAnimatorConfig {
  frameWidth: number;
  frameHeight: number;
  spriteOffset?: SpriteOffset;
  animations: AnimationDefinition[];
}
