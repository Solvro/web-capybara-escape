import type { CreateLevelInput, Direction } from "@capybara/shared";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";

import api from "../api/api-service";
import { CreatorBoard } from "../components/creator/creator-board/creator-board";
import { CreatorControl } from "../components/creator/creator-control/creator-control";
import {
  CreatorExportModal,
  type CreatorExportUploadStatus,
} from "../components/creator/creator-export-modal/creator-export-modal";
import { CreatorItemsSelect } from "../components/creator/creator-items-select/creator-items-select";
import { CreatorName } from "../components/creator/creator-name/creator-name";
import { CreatorOverwriteModal } from "../components/creator/creator-overwrite-modal/creator-overwrite-modal";
import { LAYER_NAMES } from "../constants/global";
import type { LayerItem } from "../constants/layer-items";
import { LAYER_ITEMS, LAYER_ITEM_KEYS } from "../constants/layer-items";
import { useCreatorFloorCableRotation } from "../hooks/creator/use-creator-floor-cable-rotation";
import {
  changeBoardSize,
  formatLevel,
  generateInitialTiles,
} from "../utils/tileset-utils";

export function Creator() {
  const [levelName, setLevelName] = useState<string>();
  const [dims, setDims] = useState<[number, number]>([7, 8]);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [formattedLevel, setFormattedLevel] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [isOverwriteModalOpen, setIsOverwriteModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] =
    useState<CreatorExportUploadStatus>("idle");

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
    LAYER_ITEM_KEYS.STEEL_BOX,
    LAYER_ITEM_KEYS.ENEMY,
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
    try {
      const newFormattedLevel = formatLevel(tileData, dims);
      setFormattedLevel(JSON.stringify(newFormattedLevel, null, 2));
      setUploadStatus("idle");
      setIsModalOpen(true);
      setExportError(null);
    } catch (error) {
      console.error("Failed to format level: ", error);
      setExportError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleConfirm = async () => {
    if (!levelName?.trim()) {
      setUploadStatus("error");
      return;
    }

    const createLevelInput: CreateLevelInput = {
      slug: levelName.trim(),
      name: levelName.trim(),
      isPublished: true,
      data: JSON.parse(formattedLevel),
    };

    setUploadStatus("loading");

    try {
      await api.sendRoom(createLevelInput);
      setUploadStatus("success");
    } catch (error) {
      if (error instanceof Error && "response" in error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 409) {
          setUploadStatus("idle");
          setIsOverwriteModalOpen(true);
          return;
        }
      }
      setUploadStatus("error");
    }
  };

  const handleOverwriteConfirm = async () => {
    if (!levelName?.trim()) {
      setUploadStatus("error");
      return;
    }

    const trimmedLevelName = levelName.trim();
    const createLevelInput: CreateLevelInput = {
      slug: trimmedLevelName,
      name: trimmedLevelName,
      isPublished: true,
      data: JSON.parse(formattedLevel),
    };

    setUploadStatus("loading");

    try {
      await api.updateRoom(trimmedLevelName, createLevelInput);
      setUploadStatus("success");
      setIsOverwriteModalOpen(false);
    } catch (error) {
      setUploadStatus("error");
    }
  };

  const handleCloseOverwriteModal = () => {
    setIsOverwriteModalOpen(false);
    setUploadStatus("idle");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadStatus("idle");
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
              exportError={exportError}
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
              tileData={tileData}
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

      <CreatorExportModal
        isOpen={isModalOpen}
        formattedLevel={formattedLevel}
        uploadStatus={uploadStatus}
        onFormattedLevelChange={setFormattedLevel}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />

      <CreatorOverwriteModal
        isOpen={isOverwriteModalOpen}
        levelName={levelName}
        uploadStatus={uploadStatus}
        onClose={handleCloseOverwriteModal}
        onConfirm={handleOverwriteConfirm}
      />
    </>
  );
}
