import { useState } from "react";

import { LAYER_NAMES } from "../../../constants/global";
import { LAYER_ITEMS, type LayerItem } from "../../../constants/layer-items";
import { CreatorLayerOptionsGrid } from "./parts/creator-layer-options-grid";
import { CreatorLayerTabs } from "./parts/creator-layer-tabs";
import { CreatorSelectedBlock } from "./parts/creator-selected-block";

const LAYER_TABS = [
  { key: LAYER_NAMES.FLOOR, label: "Floor" },
  { key: LAYER_NAMES.BACKGROUND, label: "Background" },
  { key: LAYER_NAMES.FLOOR_DECOYS, label: "Floor Decoys" },
  { key: LAYER_NAMES.ENTITIES, label: "Entities" },
  { key: LAYER_NAMES.WALL_DECOYS, label: "Wall Decoys" },
];

interface CreatorItemsSelectProps {
  activeBlock: LayerItem | null;
  setActiveBlock: (block: LayerItem | null) => void;
}

export function CreatorItemsSelect({
  activeBlock,
  setActiveBlock,
}: CreatorItemsSelectProps) {
  const [selectedLayer, setSelectedLayer] = useState<string>(LAYER_TABS[0].key);

  const handleLayerChange = (layer: string) => {
    setSelectedLayer(layer);
    const emptyBlockForLayer = LAYER_ITEMS[layer]?.find(
      (item) => item.label === "Empty",
    );
    if (emptyBlockForLayer) {
      setActiveBlock(emptyBlockForLayer);
    } else {
      setActiveBlock(null);
    }
  };

  const findLayerForBlock = (blockKey: string): string | null => {
    for (const [layerKey, layerItems] of Object.entries(LAYER_ITEMS)) {
      if (layerItems.some((item) => item.key === blockKey)) {
        return layerKey;
      }
    }
    return null;
  };

  const handleActiveBlockClick = () => {
    if (activeBlock === null) {
      return;
    }
    const layer = findLayerForBlock(activeBlock.key);
    if (layer !== null) {
      setSelectedLayer(layer);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-visible rounded-lg bg-[#4b2a86] p-4 shadow-lg">
      <div className="flex h-full min-h-0 w-full max-w-full flex-col overflow-visible">
        <CreatorSelectedBlock
          activeBlock={activeBlock}
          onClick={handleActiveBlockClick}
        />

        <CreatorLayerTabs
          tabs={LAYER_TABS}
          selectedLayer={selectedLayer}
          setSelectedLayer={handleLayerChange}
        />

        <CreatorLayerOptionsGrid
          layerKey={selectedLayer}
          activeBlock={activeBlock}
          setActiveBlock={setActiveBlock}
        />
      </div>
    </div>
  );
}
