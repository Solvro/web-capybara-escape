import type { LayerItem } from "../../../../constants/layer-items";
import { ENTITY_MAPPING } from "../../../../constants/blocks";
import { getTilesetBackgroundPosition } from "../../../../utils/tileset-utils";

interface CreatorLayerOptionsGridProps {
  items: LayerItem[];
  activeBlock: LayerItem | null;
  setActiveBlock: (block: LayerItem | null) => void;
}

export function CreatorLayerOptionsGrid({
  items,
  activeBlock,
  setActiveBlock,
}: CreatorLayerOptionsGridProps) {
  return (
    <div className="custom-scrollbar flex min-h-0 flex-1 flex-wrap content-start items-start justify-center gap-4 overflow-y-auto rounded-lg bg-violet-900/40 p-4">
      {items.map((item) => {
      const isEntity = ENTITY_MAPPING[item.frame] !== undefined;
        
        const { x: posX, y: posY } = isEntity
          ? { x: 0, y: 0 }
          : getTilesetBackgroundPosition(item.frame, 6, 24);

        const bgUrl = isEntity
          ? `url(${import.meta.env.BASE_URL}${ENTITY_MAPPING[item.frame].substring(1)})`
          : `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`;
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
                  backgroundImage: bgUrl,
                  backgroundPosition: isEntity ? "bottom left" : `${String(posX)}px ${String(posY)}px`,
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
  );
}
