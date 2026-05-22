import {
  type LayerItem,
  paletteDisplayLabel,
} from "../../../../constants/layer-items";
import { getUIBlockBackgroundData } from "../../../../utils/tileset-utils";
import { renderTilesetLayer } from "../../shared/render-tileset-layer";

interface CreatorSelectedBlockProps {
  activeBlock: LayerItem | null;
  onClick: () => void;
}

export function CreatorSelectedBlock({
  activeBlock,
  onClick,
}: CreatorSelectedBlockProps) {
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
                Boolean(activeBlock.color) ||
                (activeBlock.rotationDeg != null &&
                  activeBlock.rotationDeg % 360 !== 0);

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
                    renderTilesetLayer({
                      frameId: activeBlock.baseFrame,
                      direction: activeBlock.direction,
                      rotationDeg: activeBlock.rotationDeg,
                    })}
                  {renderTilesetLayer({
                    frameId: activeBlock.frame,
                    color: activeBlock.color,
                    direction: activeBlock.direction,
                    rotationDeg: activeBlock.rotationDeg,
                  })}
                </div>
              );
            })()}
          </div>
          <span className="min-w-0 shrink text-sm font-bold break-words text-violet-50">
            {paletteDisplayLabel(activeBlock)}
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
