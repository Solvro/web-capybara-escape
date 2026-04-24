import { useState } from "react";

import { LAYER_NAMES } from "../../../constants/global";
import { LAYER_ITEMS, type LayerItem } from "../../../constants/layer-items";
import { getTilesetBackgroundPosition } from "../../../utils/tileset-utils";

const LAYER_TABS = [
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

  const items = LAYER_ITEMS[selectedLayer] ?? [];

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
    <div className="flex h-full flex-col rounded-lg bg-[#4b2a86] p-4 shadow-lg">
      <div className="flex h-full w-full max-w-full flex-col">
        {/* Active Block — above categories, click to jump to its layer */}
        <button
          type="button"
          className={`mb-4 flex min-h-[72px] items-center gap-4 rounded-lg bg-violet-900/40 px-4 py-3 transition-colors ${activeBlock === null ? "" : "cursor-pointer hover:bg-violet-800/50"}`}
          onClick={handleActiveBlockClick}
          disabled={activeBlock === null}
        >
          <h3 className="shrink-0 text-xs font-bold tracking-wider text-amber-300 uppercase">
            Active Block
          </h3>
          {activeBlock === null ? (
            <span className="text-xs text-violet-300 italic opacity-60">
              None selected
            </span>
          ) : (
            <>
              <div className="h-13 w-13 overflow-hidden border-2 border-amber-400 bg-blue-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
                    backgroundPosition: `${String(-(activeBlock.frame % 6) * 24)}px ${String(-Math.floor(activeBlock.frame / 6) * 24)}px`,
                    backgroundRepeat: "no-repeat",
                    imageRendering: "pixelated",
                    transform: "scale(2)",
                    transformOrigin: "top left",
                  }}
                  className="h-6 w-6"
                />
              </div>
              <span className="text-sm font-bold text-violet-50">
                {activeBlock.label}
              </span>
            </>
          )}
        </button>

        {/* Layer tabs */}
        <div className="mb-4">
          <div
            className="custom-scrollbar flex gap-2 overflow-x-auto pb-1"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {LAYER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setSelectedLayer(tab.key);
                }}
                className={`rounded-lg px-5 py-2 text-center font-mono text-base font-bold tracking-wide whitespace-nowrap transition-colors ${
                  selectedLayer === tab.key
                    ? "border border-amber-300 bg-transparent text-amber-300"
                    : "border border-transparent bg-transparent text-gray-300 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Item grid — bigger cells */}
        <div className="custom-scrollbar flex min-h-0 flex-1 flex-wrap content-start items-start justify-center gap-4 overflow-y-auto rounded-lg bg-violet-900/40 p-4">
          {items.map((item) => {
            const { x: posX, y: posY } = getTilesetBackgroundPosition(
              item.frame,
              6,
              24,
            );
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveBlock(item);
                }}
                className={`flex flex-col items-center gap-2 rounded-md p-2 transition-colors ${
                  activeBlock !== null && activeBlock.key === item.key
                    ? "bg-amber-400/30 ring-2 ring-amber-400"
                    : "hover:bg-violet-500/40"
                }`}
                title={item.label}
              >
                <div className="h-20 w-20 overflow-hidden border-4 border-emerald-950 bg-blue-400">
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
                      backgroundPosition: `${String(posX)}px ${String(posY)}px`,
                      backgroundRepeat: "no-repeat",
                      imageRendering: "pixelated",
                      transform: "scale(3)",
                      transformOrigin: "top left",
                    }}
                    className="h-6 w-6"
                  />
                </div>
                <span className="max-w-[96px] text-center text-[11px] leading-tight font-medium text-violet-200">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
