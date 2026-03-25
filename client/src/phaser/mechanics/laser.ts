import { ASSETS } from "../../constants/blocks";
import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";
import { Mechanic } from "./mechanic";

<<<<<<< HEAD
const GHOST_IDLE_FRAMES: Record<"left" | "right" | "up" | "down", number> = {
  right: ASSETS.GHOST_IDLE_RIGHT,
  down: ASSETS.GHOST_IDLE_DOWN,
  up: ASSETS.GHOST_IDLE_UP,
  left: ASSETS.GHOST_IDLE_RIGHT,
};

const GHOST_ACTIVE_FRAMES: Record<"left" | "right" | "up" | "down", number> = {
  right: ASSETS.GHOST_ACTIVE_RIGHT,
  down: ASSETS.GHOST_ACTIVE_DOWN,
  up: ASSETS.GHOST_ACTIVE_UP,
  left: ASSETS.GHOST_ACTIVE_RIGHT,
};

const GHOST_COLOR_FRAMES: Record<"left" | "right" | "up" | "down", number> = {
  right: ASSETS.GHOST_COLOR_RIGHT,
  down: ASSETS.GHOST_COLOR_DOWN,
  up: ASSETS.GHOST_COLOR_UP,
  left: ASSETS.GHOST_COLOR_RIGHT,
=======
const CANNON_ANGLE: Record<"left" | "right" | "up" | "down", number> = {
  right: 0,
  down: 90,
  left: 180,
  up: 270,
>>>>>>> 3531e68 (fix-laser-door-interaction)
};

export class Laser extends Mechanic {
  public readonly laserId: string;
  public readonly color: string;
  private launched: boolean;
  private direction: "left" | "right" | "up" | "down";
  private range: number;
<<<<<<< HEAD
  private baseSprite: Phaser.GameObjects.Sprite;
=======

>>>>>>> 3531e68 (fix-laser-door-interaction)
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
<<<<<<< HEAD
    super(
      scene,
      x,
      y,
      launched ? GHOST_COLOR_FRAMES[direction] : ASSETS.EMPTY,
      true,
      color,
    );
    this.baseSprite = this.scene.add
      .sprite(
        0,
        0,
        "tileset",
        launched
          ? GHOST_ACTIVE_FRAMES[direction]
          : GHOST_IDLE_FRAMES[direction],
      )
      .setScale(SIZE_MULTIPLIER);
    this.add(this.baseSprite);
    if (direction === "left") {
      this.sprite.setAngle(180);
      this.baseSprite.setAngle(180);
    }
=======
    super(scene, x, y, ASSETS.LASER_GUN_RIGHT, false, color);
    this.sprite.setAngle(CANNON_ANGLE[direction]);
>>>>>>> 3531e68 (fix-laser-door-interaction)
    this.laserId = laserId;
    this.color = color;
    this.launched = launched;
    this.direction = direction;
    this.range = range;
    this.sendToBack(this.baseSprite);
  }

  public get id(): string {
    return this.laserId;
  }

  public get isLaunched(): boolean {
    return this.launched;
  }

  public set isLaunched(value: boolean) {
    this.launched = value;
<<<<<<< HEAD

    if (this.launched) {
      this.sprite.setFrame(GHOST_COLOR_FRAMES[this.direction]);
      this.baseSprite.setFrame(GHOST_ACTIVE_FRAMES[this.direction]);
    } else {
      this.sprite.setFrame(ASSETS.EMPTY);
      this.baseSprite.setFrame(GHOST_IDLE_FRAMES[this.direction]);
    }

=======
>>>>>>> 3531e68 (fix-laser-door-interaction)
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

    const isHorizontal =
      this.direction === "left" || this.direction === "right";
    const baseFrame = isHorizontal
      ? ASSETS.LASER_BEAM_HORIZONTAL
      : ASSETS.LASER_BEAM_VERTICAL;
    const tipFrame = isHorizontal
      ? ASSETS.LASER_BEAM_HORIZONTAL_TIP
      : ASSETS.LASER_BEAM_VERTICAL_TIP;

<<<<<<< HEAD
=======
    const baseShift = 2 * SIZE_MULTIPLIER;
>>>>>>> 3531e68 (fix-laser-door-interaction)
    const beamAngle = this.direction === "left" ? 180 : 0;
    const colorInt = Phaser.Display.Color.HexStringToColor(this.color).color;

    for (let index = 1; index <= this.range; index++) {
      let offsetX = 0;
      let offsetY = 0;

      switch (this.direction) {
        case "left": {
          offsetX = -index * CELL_SIZE;
          break;
        }
        case "right": {
          offsetX = index * CELL_SIZE;
          break;
        }
        case "up": {
<<<<<<< HEAD
          offsetY = -index * CELL_SIZE;
          break;
        }
        case "down": {
          offsetY = index * CELL_SIZE;
=======
          offsetX = -2 * SIZE_MULTIPLIER; 
          offsetY = -index * CELL_SIZE + baseShift;
          break;
        }
        case "down": {
          offsetX = 2 * SIZE_MULTIPLIER; 
          offsetY = index * CELL_SIZE - baseShift;
>>>>>>> 3531e68 (fix-laser-door-interaction)
          break;
        }
      }

<<<<<<< HEAD
=======
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

>>>>>>> 3531e68 (fix-laser-door-interaction)
      const frame = index === this.range ? tipFrame : baseFrame;
      const segment = this.scene.add.sprite(offsetX, offsetY, "tileset", frame);

      segment.setAngle(beamAngle);
      if (this.direction === "up") {
        segment.setFlipY(true);
      }

      segment.setTint(colorInt);

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
