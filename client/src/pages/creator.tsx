import { useEffect, useState } from "react";

import { CreatorBoard } from "../components/creator/creator-board/creator-board";
import { CreatorControl } from "../components/creator/creator-control/creator-control";
import { CreatorItemsSelect } from "../components/creator/creator-items-select/creator-items-select";
import { CreatorName } from "../components/creator/creator-name/creator-name";
import { LAYER_NAMES } from "../constants/global";
import type { LayerItem } from "../constants/layer-items";
import { LAYER_ITEMS, LAYER_ITEM_KEYS } from "../constants/layer-items";
import { useCreatorFloorCableRotation } from "../hooks/creator/use-creator-floor-cable-rotation";
import type { CreateLevelInput } from "../types/createLevelInput";
import { type DirectionType } from "../types/direction";
import api from "../utils/api";
import {
  changeBoardSize,
  formatLevel,
  generateInitialTiles,
} from "../utils/tileset-utils";

export function Creator() {
  const [levelName, setLevelName] = useState<string>();
  const [dims, setDims] = useState<[number, number]>([7, 8]);
  const [direction, setDirection] = useState<DirectionType | null>(null);
  const [formattedLevel, setFormattedLevel] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBlock, setActiveBlock] = useState<LayerItem | null>(() => {
    return (
      LAYER_ITEMS[LAYER_NAMES.FLOOR]?.find((item) => item.label === "Empty") ||
      null
    );
  });

  const { floorCableRotationByBase, rotateCableAtBase } =
    useCreatorFloorCableRotation(activeBlock, setActiveBlock);

  const floorDecoys = [
    LAYER_ITEM_KEYS.VENT_OPEN,
    LAYER_ITEM_KEYS.VENT_CLOSED,
    LAYER_ITEM_KEYS.WIRE,
    `${LAYER_ITEM_KEYS.BUTTON}-0`,
  ];
  const entities = [
    LAYER_ITEM_KEYS.CRATE,
    `${LAYER_ITEM_KEYS.LASER}-0-right`,
    LAYER_ITEM_KEYS.CAPYBARA_START,
    LAYER_ITEM_KEYS.SOL_START,
    LAYER_ITEM_KEYS.VRON_START,
  ];
  const wallDecoys = [`${LAYER_ITEM_KEYS.DOOR}-0`];

  const [tileData, setTileData] = useState<(string | null)[][]>(() =>
    generateInitialTiles(dims, floorDecoys, entities, wallDecoys),
  );

  const [rows, cols] = dims;
  useEffect(() => {
    setTileData((prev) => changeBoardSize([rows, cols], direction, prev));
  }, [rows, cols, direction]);

  const handleReset = () => {
    setTileData(
      generateInitialTiles([rows, cols], floorDecoys, entities, wallDecoys),
    );
  };

  const onRoomSubmit = () => {
    const newFormattedLevel = formatLevel(tileData, dims);
    setFormattedLevel(JSON.stringify(newFormattedLevel, null, 2));
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const createLevelInput: CreateLevelInput = {
      slug: levelName,
      name: levelName,
      data: JSON.parse(formattedLevel),
    };

    api.sendRoom(createLevelInput);

    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mx-[2dvw] mt-[2dvh] mb-[2dvh] flex w-auto flex-col gap-[2dvh] text-center">
        <div className="flex h-[14dvh] w-full items-stretch gap-[1dvw]">
          <div className="w-[30dvw]">
            <CreatorName levelName={levelName} setLevelName={setLevelName} />
          </div>
          <div className="w-[64dvw]">
            <CreatorControl
              dims={dims}
              setDims={setDims}
              onReset={handleReset}
              setDirection={setDirection}
              onRoomSubmit={onRoomSubmit}
            />
          </div>
        </div>
        <div className="flex h-[80dvh] w-full items-stretch gap-[1dvw]">
          <div className="flex h-full min-h-0 w-[30dvw] flex-col overflow-visible">
            <CreatorItemsSelect
              activeBlock={activeBlock}
              setActiveBlock={setActiveBlock}
              floorCableRotationByBase={floorCableRotationByBase}
            rotateCableAtBase={rotateCableAtBase}
          />
          </div>
          <div className="w-[64dvw]">
            <CreatorBoard
              dims={dims}
              setDirection={setDirection}
              setDims={setDims}
              activeBlock={activeBlock}
              tileData={tileData}
              setTileData={setTileData}
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="absolute left-[2.5%] top-[18%] flex h-[80%] w-[30%] flex-col gap-4 rounded bg-white p-6 text-black shadow-lg">
            <textarea
              className="w-full flex-grow resize-none rounded border border-gray-300 p-2 font-mono text-sm"
              value={formattedLevel}
              onChange={(e) => setFormattedLevel(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                className="rounded bg-gray-300 px-4 py-2 font-semibold hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                onClick={handleConfirm}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
