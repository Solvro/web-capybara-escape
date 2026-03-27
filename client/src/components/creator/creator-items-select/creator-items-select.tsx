import { useState } from "react";

const MENU_OPTIONS = [
  { key: "button", label: "Buttons" },
  { key: "door", label: "Doors" },
  { key: "crate", label: "Crates" },
  { key: "laser", label: "Lasers" },
  { key: "cable", label: "Cables" },
  { key: "vent", label: "Vents" },
  { key: "wire", label: "Wires" },
];

export function CreatorItemsSelect() {
  const [selected, setSelected] = useState<string>(MENU_OPTIONS[0].key);

  return (
    <div className="flex h-full flex-col rounded-lg bg-[#4b2a86] p-4 shadow-lg">
      {/* Common width container for menu and select */}
      <div className="flex h-full w-full max-w-full flex-col">
        {/* Options Menu */}
        <div className="mb-4">
          <div
            className="custom-scrollbar flex gap-2 overflow-x-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {MENU_OPTIONS.map((option) => (
              <button
                key={option.key}
                onClick={() => setSelected(option.key)}
                className={`rounded-md px-6 py-2 text-center text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
                  selected === option.key
                    ? "bg-amber-400 text-violet-900 shadow"
                    : "bg-violet-500/70 text-amber-100 hover:bg-violet-400/80"
                } `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        {/* Options Select (empty for now) */}
        <div className="mx-auto flex min-h-0 w-full max-w-[calc(100vw-4rem)] flex-1 items-center justify-center rounded-lg bg-orange-300/80">
          <span className="text-lg font-bold text-orange-900 opacity-60">
            Options Select
          </span>
        </div>
      </div>
    </div>
  );
}
