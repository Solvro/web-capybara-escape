import { CELL_SIZE, SIZE_MULTIPLIER } from "../../constants/global";

const TILE_MAPPING: Record<
  string,
  { frame: number; isTall?: boolean; frameSecond?: number }
> = {
  w1t: { frame: 0, frameSecond: 10, isTall: true },
  w1: { frame: 0 },
  w13: { frame: 9 },
  w2t: { frame: 2, frameSecond: 4, isTall: true },
  w2: { frame: 2 },
  w3t: { frame: 3, frameSecond: 4, isTall: true },
  w3: { frame: 3 },
  w21: { frame: 8 },
  f1: { frame: 6 },
};

export class Display {
  private scene: Phaser.Scene;
  private layerMap: Map<string, Phaser.GameObjects.Layer>;
  private BACKGROUND: Phaser.GameObjects.Layer;
  private FLOOR_DECOYS: Phaser.GameObjects.Layer;
  private ENTITIES: Phaser.GameObjects.Layer;
  private WALL_DECOYS: Phaser.GameObjects.Layer;
  private EFFECTS: Phaser.GameObjects.Layer;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.BACKGROUND = this.scene.add.layer();
    this.FLOOR_DECOYS = this.scene.add.layer();
    this.ENTITIES = this.scene.add.layer();
    this.WALL_DECOYS = this.scene.add.layer();
    this.EFFECTS = this.scene.add.layer();
    this.layerMap = new Map<string, Phaser.GameObjects.Layer>([
      ["background", this.BACKGROUND],
      ["floor decoys", this.FLOOR_DECOYS],
      ["entities", this.ENTITIES],
      ["wall decoys", this.WALL_DECOYS],
      ["effects", this.EFFECTS],
    ]);
    this.BACKGROUND.setDepth(0);
    this.FLOOR_DECOYS.setDepth(1);
    this.ENTITIES.setDepth(2);
    this.WALL_DECOYS.setDepth(3);
    this.EFFECTS.setDepth(4);
  }

  add(
    layer:
      | "background"
      | "floor decoys"
      | "entities"
      | "wall decoys"
      | "effects",
    object: Phaser.GameObjects.GameObject,
    isUsingPreUpdate? : boolean
  ) {
    this.layerMap.get(layer)?.add(object);
    if(isUsingPreUpdate ?? false){
      this.scene.sys.updateList.add(object); //żeby się updatowało (inaczej PreUpdate sie wywala)
    }
  }

  remove(
    layer:
      | "background"
      | "floor decoys"
      | "entities"
      | "wall decoys"
      | "effects",
    object: Phaser.GameObjects.GameObject,
  ) {
    this.layerMap.get(layer)?.remove(object);
  }

  createMap(grid: string[][], width: number, height: number) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tileType = grid[y][x];
        const posX = x * CELL_SIZE + CELL_SIZE / 2;
        const posY = y * CELL_SIZE + CELL_SIZE / 2;

        const config = TILE_MAPPING[tileType];

        if (tileType !== "") { //To jest potencjalnie do zamiany, ale działa i jest mniej kodu
          this.layerMap
            .get("background")
            ?.add(
              this.scene.add
                .image(posX, posY, "tileset", config.frame)
                .setScale(SIZE_MULTIPLIER),
            );
          if (config.isTall ?? false) {
            this.layerMap
              .get("wall decoys")
              ?.add(
                this.scene.add
                  .image(posX, posY - CELL_SIZE, "tileset", config.frameSecond)
                  .setScale(SIZE_MULTIPLIER),
              );
          }
        }
      }
    }
  }
}
