import { useEffect, useState } from "react";

import { CreatorBoard } from "../components/creator/creator-board/creator-board";
import { CreatorControl } from "../components/creator/creator-control/creator-control";
import { CreatorItemsSelect } from "../components/creator/creator-items-select/creator-items-select";
import { CreatorName } from "../components/creator/creator-name/creator-name";
import { ASSETS, TILE_MAPPING } from "../constants/blocks";
import type { LayerItem } from "../constants/layer-items";
import { generateInitialTiles } from "../utils/tileset-utils";

export function Creator() {
  const [levelName, setLevelName] = useState<string>();
  const [dims, setDims] = useState<[number, number]>([7, 8]);

  const [activeBlock, setActiveBlock] = useState<LayerItem | null>(null);

  const floorDecoys = [
    ASSETS.VENT_OPEN,
    ASSETS.VENT_CLOSED,
    ASSETS.WIRE,
    ASSETS.BUTTON_RELEASED,
  ];
  const entities = [ASSETS.CRATE, ASSETS.LASER_GUN];
  const wallDecoys = [ASSETS.DOOR_CLOSED];

  const [tileIndices, setTileIndices] = useState<(number | null)[][]>(() =>
    generateInitialTiles(dims, floorDecoys, entities, wallDecoys, TILE_MAPPING),
  );

  const [rows, cols] = dims;
  useEffect(() => {
    setTileIndices(
      generateInitialTiles(
        [rows, cols],
        floorDecoys,
        entities,
        wallDecoys,
        TILE_MAPPING,
      ),
    );
  }, [rows, cols]);

  const handleReset = () => {
    setTileIndices(
      generateInitialTiles(
        [rows, cols],
        floorDecoys,
        entities,
        wallDecoys,
        TILE_MAPPING,
      ),
    );
  };

  return (
    <div className="mx-[2dvw] mt-[2dvh] mb-[2dvh] flex w-auto flex-col gap-[2dvh] text-center">
      <div className="flex h-[14dvh] w-full items-stretch gap-[1dvw]">
        <div className="w-[30dvw]">
          <CreatorName levelName={levelName} setLevelName={setLevelName} />
        </div>
        <div className="w-[64dvw]">
          <CreatorControl dims={dims} setDims={setDims} onReset={handleReset} />
        </div>
      </div>
      <div className="flex h-[80dvh] w-full items-stretch gap-[1dvw]">
        <div className="w-[30dvw]">
          <CreatorItemsSelect
            activeBlock={activeBlock}
            setActiveBlock={setActiveBlock}
          />
          <CreatorItemsSelect
            activeBlock={activeBlock}
            setActiveBlock={setActiveBlock}
          />
        </div>
        <div className="w-[64dvw]">
          <CreatorBoard
            dims={dims}
            activeBlock={activeBlock}
            tileIndices={tileIndices}
            setTileIndices={setTileIndices}
          />
        </div>
      </div>
    </div>
  );
}
