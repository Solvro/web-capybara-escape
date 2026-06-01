import { CELL_SIZE } from "../../constants/global";
import type { EntityAnimator } from "../animators/entity-animator";
import { Entity } from "./entity";
import type { Direction } from "./entity";

export class Player extends Entity {
  public readonly name: string;
  public readonly sessionId: string;
  public readonly local: boolean;
  private nameText: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    sessionId: string,
    local = false,
    textureKey = "player",
    animator: EntityAnimator | null = null,
  ) {
    super(scene, x, y, textureKey, animator);
    this.name = name;
    this.sessionId = sessionId;
    this.local = local;

    this.nameText = this.scene.add
      .text(0, -(CELL_SIZE / 2) - 4, name, {
        fontSize: "26px",
        color: local ? "#ffdd77" : "#fff",
        align: "center",
        stroke: "#000",
        strokeThickness: 2,
      })
      .setOrigin(0.5, 1);
    this.add(this.nameText);
  }

  move(direction: Direction, ease = "Circular") {
    super.move(direction, ease);
  }

  public get playerName(): string {
    return this.name;
  }

  public get id(): string {
    return this.sessionId;
  }

  public get isLocal(): boolean {
    return this.local;
  }
}
