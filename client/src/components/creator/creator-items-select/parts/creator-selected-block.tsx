import type { LayerItem } from "../../../../constants/layer-items";
import {
  getTilesetBackgroundPosition,
  getUIBlockBackgroundData,
} from "../../../../utils/tileset-utils";

interface CreatorSelectedBlockProps {
  activeBlock: LayerItem | null;
  onClick: () => void;
}

export function CreatorSelectedBlock({
  activeBlock,
  onClick,
}: CreatorSelectedBlockProps) {
  const renderPart = (frameId: number, color?: string, direction?: string) => {
    const { x: px, y: py } = getTilesetBackgroundPosition(frameId, 6, 24);
    const innerTransform = direction === "left" ? "scaleX(-1)" : "none";

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

  return (
    <button
      type="button"
      className={`mb-4 flex min-h-[72px] items-center gap-4 rounded-lg bg-violet-900/40 px-4 py-3 transition-colors ${activeBlock === null ? "" : "cursor-pointer hover:bg-violet-800/50"}`}
      onClick={onClick}
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
          <div className="relative h-13 w-13 overflow-hidden border-2 border-amber-400 bg-blue-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]">
            {(() => {
              const composite =
                activeBlock.baseFrame !== undefined ||
                Boolean(activeBlock.color);
              if (!composite) {
                const { bgUrl, bgPosX, bgPosY } = getUIBlockBackgroundData(
                  activeBlock.frame,
                  24,
                  import.meta.env.BASE_URL,
                );
                return (
                  <div
                    className="h-6 w-6"
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundImage: bgUrl,
                      backgroundPosition: `${bgPosX}px ${bgPosY}px`,
                      backgroundRepeat: "no-repeat",
                      imageRendering: "pixelated",
                      transform: "scale(2)",
                      transformOrigin: "top left",
                    }}
                  />
                );
              }
              return (
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    transform: "scale(2)",
                    transformOrigin: "top left",
                    position: "relative",
                  }}
                >
                  {activeBlock.baseFrame !== undefined &&
                    renderPart(
                      activeBlock.baseFrame,
                      undefined,
                      activeBlock.direction,
                    )}
                  {renderPart(
                    activeBlock.frame,
                    activeBlock.color,
                    activeBlock.direction,
                  )}
                </div>
              );
            })()}
          </div>
          <span className="text-sm font-bold text-violet-50">
            {activeBlock.label}
          </span>
          {activeBlock.color && (
            <div
              className="h-4 w-4 rounded-full border border-white/50"
              style={{ backgroundColor: activeBlock.color }}
              title="Selected color"
            />
          )}
        </>
      )}
    </button>
  );
}
