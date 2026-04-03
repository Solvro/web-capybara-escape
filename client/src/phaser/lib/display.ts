import { CELL_SIZE, SIZE_MULTIPLIER, LAYERS } from "../../constants/global";
import type {LayerNames} from "../../constants/global";
import { TILE_MAPPING } from "../../constants/blocks";



export class Display {
  private scene: Phaser.Scene;
  private layerMap: Map<string, Phaser.GameObjects.Layer>;


  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.layerMap = new Map();
    for(const layerName of LAYERS){
      const layer = this.scene.add.layer();
      layer.setDepth(LAYERS.indexOf(layerName));
      this.layerMap.set(layerName, layer);
    }
  }

  add(
    layer: LayerNames,
    object: Phaser.GameObjects.GameObject,
    isUsingPreUpdate? : boolean
  ) {
    this.layerMap.get(layer)?.add(object);
    if(isUsingPreUpdate ?? false){
      this.scene.sys.updateList.add(object); //żeby się updatowało (inaczej PreUpdate sie wywala)
    }
  }

  remove(
    layer: LayerNames,
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

        if (tileType !== "") {
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
