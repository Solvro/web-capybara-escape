import { useEffect, useRef } from "react";

import { COLOR_LIST } from "../../../../constants/global";

interface CreatorColorPickerProps {
  /** Index of the currently selected color in COLOR_LIST, or null if none */
  selectedColorIndex: number;
  onSelectColor: (colorIndex: number) => void;
  onClose: () => void;
}

export function CreatorColorPicker({
  selectedColorIndex,
  onSelectColor,
  onClose,
}: CreatorColorPickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay adding listener to prevent immediate close from the same click
    const timeout = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full left-1/2 z-50 mt-2 flex -translate-x-1/2 gap-1.5 rounded-lg border border-violet-400/40 bg-violet-950/95 p-2 shadow-xl backdrop-blur-sm"
      style={{ minWidth: "fit-content" }}
    >
      {COLOR_LIST.map((color, idx) => (
        <button
          key={color}
          onClick={(e) => {
            e.stopPropagation();
            onSelectColor(idx);
          }}
          className={`h-7 w-7 rounded-md border-2 transition-all hover:scale-110 ${
            idx === selectedColorIndex
              ? "border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_8px_rgba(251,191,36,0.4)]"
              : "border-violet-400/30 hover:border-violet-300"
          }`}
          style={{ backgroundColor: color }}
          title={`Color ${String(idx + 1)}`}
        />
      ))}
    </div>
  );
}
