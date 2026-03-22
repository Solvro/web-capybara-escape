import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";
import { Mechanic } from "./mechanic";

/**
 * Frame 30 (LASER_GUN_RIGHT) is the actual cannon sprite, facing RIGHT at 0°.
 * Rotate it in Phaser to cover all four directions:
 *   right →   0°
 *   down  →  90°
 *   left  → 180°
 *   up    → 270°
 */
const CANNON_ANGLE: Record<"left" | "right" | "up" | "down", number> = {
  right: 0,
  down: 90,
  left: 180,
  up: 270,
};

export class Laser extends Mechanic {
  public readonly laserId: string;
  public readonly color: string;
  private launched: boolean;
  private direction: "left" | "right" | "up" | "down";
  private range: number;
  /** Array of sprites that make up the beam. */
  private beamSprites: Phaser.GameObjects.Sprite[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    laserId: string,
    direction: "left" | "right" | "up" | "down",
    range: number,
    color: string,
    launched = false,
  ) {
    // Frame 30 is the right-facing cannon; rotate it to match the direction.
    super(scene, x, y, ASSETS.LASER_GUN_RIGHT, false, color);
    // Rotate the sprite so the barrel faces the firing direction.
    this.sprite.setAngle(CANNON_ANGLE[direction]);
    this.laserId = laserId;
    this.color = color;
    this.launched = launched;
    this.direction = direction;
    this.range = range;
  }

  public get id(): string {
    return this.laserId;
  }

  public get isLaunched(): boolean {
    return this.launched;
  }

  public set isLaunched(value: boolean) {
    this.launched = value;
    // Cannon frame stays the same whether active or not — direction doesn't change.
    if (this.launched) {
      this.launchLaser();
    } else {
      this.disactivateLaser();
    }
  }

  public launch(isLaunched: boolean, range: number) {
    this.range = range;
    this.isLaunched = isLaunched;
  }

  private launchLaser() {
    this.disactivateLaser();

    const isHorizontal = this.direction === "left" || this.direction === "right";
    const baseFrame = isHorizontal
      ? ASSETS.LASER_BEAM_HORIZONTAL
      : ASSETS.LASER_BEAM_VERTICAL;
    const tipFrame = isHorizontal
      ? ASSETS.LASER_BEAM_HORIZONTAL_TIP
      : ASSETS.LASER_BEAM_VERTICAL_TIP;

    // Horizontal frames naturally point RIGHT. Vertical frames naturally point DOWN.
    // Shift the whole beam 2 original pixels towards the cannon to close the nozzle gap
    const baseShift = 2 * SIZE_MULTIPLIER;
    const beamAngle = this.direction === "left" ? 180 : 0;
    const colorInt = Phaser.Display.Color.HexStringToColor(this.color).color;

    for (let index = 1; index <= this.range; index++) {
      let offsetX = 0;
      let offsetY = 0;
      
      switch (this.direction) {
        case "left": {
          offsetX = -index * CELL_SIZE + baseShift;
          break;
        }
        case "right": {
          offsetX = index * CELL_SIZE - baseShift;
          break;
        }
        case "up": {
          offsetX = -2 * SIZE_MULTIPLIER; // Lateral shift to align with nozzle
          offsetY = -index * CELL_SIZE + baseShift;
          break;
        }
        case "down": {
          offsetX = 2 * SIZE_MULTIPLIER; // Lateral shift to align with nozzle
          offsetY = index * CELL_SIZE - baseShift;
          break;
        }
      }

      // Add 2 extra pixels shift to the tip to close its connection gap
      if (index === this.range) {
        const extraShift = 2 * SIZE_MULTIPLIER;
        switch (this.direction) {
          case "left": {
            offsetX += extraShift;
            break;
          }
          case "right": {
            offsetX -= extraShift;
            break;
          }
          case "up": {
            offsetY += extraShift;
            break;
          }
          case "down": {
            offsetY -= extraShift;
            break;
          }
        }
      }

      const frame = index === this.range ? tipFrame : baseFrame;
      const segment = this.scene.add.sprite(offsetX, offsetY, "tileset", frame);
      
      segment.setAngle(beamAngle);
      if (this.direction === "up") {
        segment.setFlipY(true);
      }
      
      segment.setTint(colorInt);

      // Fix 1px transparent gaps in vertical beam by stretching body segments
      if (!isHorizontal && index !== this.range) {
        segment.setDisplaySize(CELL_SIZE, CELL_SIZE + SIZE_MULTIPLIER);
      } else {
        segment.setScale(SIZE_MULTIPLIER);
      }

      this.beamSprites.push(segment);
      this.add(segment);
      this.sendToBack(segment);
    }
  }

  private disactivateLaser() {
    for (const segment of this.beamSprites) {
      segment.destroy();
    }
    this.beamSprites = [];
  }
}
