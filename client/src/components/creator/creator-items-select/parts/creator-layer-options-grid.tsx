import type { LayerItem } from "../../../../constants/layer-items";
import {
  getTilesetBackgroundPosition,
  getUIBlockBackgroundData,
} from "../../../../utils/tileset-utils";

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
        const renderPart = (
          frameId: number,
          color?: string,
          direction?: string,
        ) => {
          const { x: px, y: py } = getTilesetBackgroundPosition(
            frameId,
            6,
            24,
          );
          const innerTransform =
            direction === "left" ? "rotate(180deg)" : "none";

          if (color) {
            return (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "24px",
                  height: "24px",
                  backgroundColor: color,
                  maskImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
                  maskPosition: `${String(px)}px ${String(py)}px`,
                  maskRepeat: "no-repeat",
                  WebkitMaskImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
                  WebkitMaskPosition: `${String(px)}px ${String(py)}px`,
                  WebkitMaskRepeat: "no-repeat",
                  imageRendering: "pixelated",
                  transform: innerTransform,
                  transformOrigin: "center center",
                }}
              />
            );
          }
          return (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "24px",
                height: "24px",
                backgroundImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
                backgroundPosition: `${String(px)}px ${String(py)}px`,
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
                transform: innerTransform,
                transformOrigin: "center center",
              }}
            />
          );
        };

        const useCompositeBlend =
          item.baseFrame !== undefined || Boolean(item.color);

        const { bgUrl, bgPosX, bgPosY } = getUIBlockBackgroundData(
          item.frame,
          24,
          import.meta.env.BASE_URL,
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
            {!useCompositeBlend ? (
              <div className="h-20 w-20 overflow-hidden border-4 border-emerald-950 bg-blue-400">
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundImage: bgUrl,
                    backgroundPosition: `${bgPosX}px ${bgPosY}px`,
                    backgroundRepeat: "no-repeat",
                    imageRendering: "pixelated",
                    transform: "scale(3)",
                    transformOrigin: "top left",
                  }}
                  className="h-6 w-6"
                />
              </div>
            ) : (
              <div className="relative h-20 w-20 overflow-hidden border-4 border-emerald-950 bg-blue-400">
                <div
                  style={{
                    transform: "scale(3)",
                    transformOrigin: "top left",
                    width: "24px",
                    height: "24px",
                    position: "relative",
                  }}
                >
                  {item.baseFrame !== undefined &&
                    renderPart(item.baseFrame, undefined, item.direction)}
                  {renderPart(item.frame, item.color, item.direction)}
                </div>
              </div>
            )}
            <span className="max-w-[96px] text-center text-[11px] leading-tight font-medium text-violet-200">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
