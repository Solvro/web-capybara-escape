import { TEXTURE_PATH } from "../../../../constants/global";
import type { LayerItem } from "../../../../constants/layer-items";

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
          <div className="h-13 w-13 overflow-hidden border-2 border-amber-400 bg-blue-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]">
            <div
              style={{
                width: "24px",
                height: "24px",
                backgroundImage: TEXTURE_PATH,
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
  );
}
