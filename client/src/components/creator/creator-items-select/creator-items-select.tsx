import { useState } from "react";

import { LAYER_NAMES } from "../../../constants/global";
import { ASSETS, TILE_MAPPING } from "../../../constants/blocks";

interface LayerItem {
  key: string;
  label: string;
  frame: number;
}

const LAYER_ITEMS: Record<string, LayerItem[]> = {
  [LAYER_NAMES.BACKGROUND]: [
    { key: "f1", label: "Floor", frame: TILE_MAPPING.f1.frame },
    { key: "w1t", label: "Wall 1 Top", frame: TILE_MAPPING.w1t.frame },
    { key: "w1t-upper", label: "Wall 1 Upper", frame: 10 },
    { key: "w1", label: "Wall 1", frame: TILE_MAPPING.w1.frame },
    { key: "w13", label: "Wall 1-3", frame: TILE_MAPPING.w13.frame },
    { key: "w2t", label: "Wall 2 Top", frame: TILE_MAPPING.w2t.frame },
    { key: "w2t-upper", label: "Wall 2/3 Upper", frame: 4 },
    { key: "w2", label: "Wall 2", frame: TILE_MAPPING.w2.frame },
    { key: "w3t", label: "Wall 3 Top", frame: TILE_MAPPING.w3t.frame },
    { key: "w3", label: "Wall 3", frame: TILE_MAPPING.w3.frame },
    { key: "w21", label: "Wall 2-1", frame: TILE_MAPPING.w21.frame },
    { key: "empty", label: "Empty", frame: ASSETS.EMPTY },
  ],
  [LAYER_NAMES.FLOOR_DECOYS]: [
    { key: "button", label: "Button", frame: ASSETS.BUTTON_RELEASED },
    { key: "buttonPressed", label: "Button Pressed", frame: ASSETS.BUTTON_PRESSED },
    { key: "buttonBase", label: "Button Base", frame: ASSETS.BUTTON_BASE },
    { key: "pointButton", label: "Point Button", frame: ASSETS.POINT_BUTTON },
    { key: "cable", label: "Cable Active", frame: ASSETS.CABLE_END_ACTIVE },
    { key: "cableInactive", label: "Cable Inactive", frame: ASSETS.CABLE_END_INACTIVE },
    { key: "socket", label: "Socket", frame: ASSETS.SOCKET },
    { key: "wire", label: "Wire", frame: ASSETS.WIRE },
    { key: "wireCurve", label: "Wire Curve", frame: ASSETS.WIRE_CURVE },
    { key: "ventOpen", label: "Vent Open", frame: ASSETS.VENT_OPEN },
    { key: "ventClosed", label: "Vent Closed", frame: ASSETS.VENT_CLOSED },
  ],
  [LAYER_NAMES.ENTITIES]: [
    { key: "crate", label: "Crate", frame: ASSETS.CRATE },
    { key: "laserGun", label: "Laser Gun", frame: ASSETS.LASER_GUN },
    { key: "laserGunFired", label: "Laser Fired", frame: ASSETS.LASER_GUN_FIRED },
    { key: "laserBeamH", label: "Beam Horiz.", frame: ASSETS.LASER_BEAM_HORIZONTAL },
    { key: "laserBeamV", label: "Beam Vert.", frame: ASSETS.LASER_BEAM_VERTICAL },
    { key: "laserBeamHTip", label: "Beam H Tip", frame: ASSETS.LASER_BEAM_HORIZONTAL_TIP },
    { key: "laserBeamVTip", label: "Beam V Tip", frame: ASSETS.LASER_BEAM_VERTICAL_TIP },
  ],
  [LAYER_NAMES.WALL_DECOYS]: [
    { key: "door", label: "Door Closed", frame: ASSETS.DOOR_CLOSED },
    { key: "doorBase", label: "Door Base", frame: ASSETS.DOOR_BASE },
  ],
};

const LAYER_TABS = [
  { key: LAYER_NAMES.BACKGROUND, label: "Background" },
  { key: LAYER_NAMES.FLOOR_DECOYS, label: "Floor Decoys" },
  { key: LAYER_NAMES.ENTITIES, label: "Entities" },
  { key: LAYER_NAMES.WALL_DECOYS, label: "Wall Decoys" },
];

interface CreatorItemsSelectProps {
  activeBlock: { key: string; frame: number; label: string } | null;
  setActiveBlock: (block: { key: string; frame: number; label: string } | null) => void;
}

export function CreatorItemsSelect({ activeBlock, setActiveBlock }: CreatorItemsSelectProps) {
  const [selectedLayer, setSelectedLayer] = useState<string>(LAYER_TABS[0].key);

  const items = LAYER_ITEMS[selectedLayer] ?? [];

  return (
    <div className="flex h-full flex-col rounded-lg bg-[#4b2a86] p-4 shadow-lg">
      <div className="flex h-full w-full max-w-full flex-col">
        {/* Active Block — above categories */}
        <div className="mb-4 flex items-center gap-4 rounded-lg bg-violet-900/40 px-4 py-3">
          <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider shrink-0">Active Block</h3>
          {activeBlock === null ? (
            <span className="text-xs italic text-violet-300 opacity-60">None selected</span>
          ) : (
            <>
              <div
                className="overflow-hidden border-2 border-amber-400 bg-blue-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                style={{ width: "48px", height: "48px" }}
              >
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
                />
              </div>
              <span className="text-sm font-bold text-violet-50">{activeBlock.label}</span>
            </>
          )}
        </div>

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
                className={`rounded-md px-6 py-2 text-center text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
                  selectedLayer === tab.key
                    ? "bg-amber-400 text-violet-900 shadow"
                    : "bg-violet-500/70 text-amber-100 hover:bg-violet-400/80"
                } `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Item grid — bigger cells */}
        <div className="custom-scrollbar flex min-h-0 flex-1 flex-wrap content-start items-start justify-center gap-4 overflow-y-auto rounded-lg bg-violet-900/40 p-4">
          {items.map((item) => {
            const posX = -(item.frame % 6) * 24;
            const posY = -Math.floor(item.frame / 6) * 24;

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
                <div
                  className="overflow-hidden border-4 border-emerald-950 bg-blue-400"
                  style={{
                    width: "96px",
                    height: "96px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
                      backgroundPosition: `${String(posX)}px ${String(posY)}px`,
                      backgroundRepeat: "no-repeat",
                      imageRendering: "pixelated",
                      transform: "scale(4)",
                      transformOrigin: "top left",
                    }}
                  />
                </div>
                <span className="max-w-[96px] text-center text-[11px] font-medium leading-tight text-violet-200">
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
