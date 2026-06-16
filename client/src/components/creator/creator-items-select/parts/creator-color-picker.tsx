import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { COLOR_LIST, Z_INDEX } from "../../../../constants/global";

interface CreatorColorPickerProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  selectedColorIndex: number;
  onSelectColor: (colorIndex: number) => void;
  onClose: () => void;
}

const VIEWPORT_PAD = 8;
const PICKER_GAP = 8;

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

export function CreatorColorPicker({
  anchorRef,
  selectedColorIndex,
  onSelectColor,
  onClose,
}: CreatorColorPickerProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );

  const updatePosition = useCallback((): void => {
    const anchor = anchorRef.current;
    const popup = popupRef.current;
    if (!anchor) {
      return;
    }
    const rect = anchor.getBoundingClientRect();
    const width = popup?.offsetWidth ?? 280;
    const height = popup?.offsetHeight ?? 48;

    const centerX = rect.left + rect.width / 2;
    const left = clamp(
      centerX,
      VIEWPORT_PAD + width / 2,
      window.innerWidth - VIEWPORT_PAD - width / 2,
    );

    let top = rect.bottom + PICKER_GAP;
    if (top + height > window.innerHeight - VIEWPORT_PAD) {
      top = rect.top - PICKER_GAP - height;
    }
    top = clamp(top, VIEWPORT_PAD, window.innerHeight - VIEWPORT_PAD - height);

    setCoords((prev) => {
      if (prev && prev.top === top && prev.left === left) {
        return prev;
      }
      return { top, left };
    });
  }, [anchorRef]);

  useLayoutEffect(() => {
    updatePosition();
    if (!anchorRef.current) {
      const id = window.requestAnimationFrame(() => {
        updatePosition();
      });
      return () => window.cancelAnimationFrame(id);
    }
  }, [anchorRef, updatePosition]);

  useLayoutEffect(() => {
    const el = popupRef.current;
    if (!el || coords === null) {
      return;
    }
    const ro = new ResizeObserver(() => {
      updatePosition();
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, [coords, updatePosition]);

  useEffect(() => {
    const onWin = () => {
      updatePosition();
    };
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, true);
    return () => {
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin, true);
    };
  }, [updatePosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const popup = popupRef.current;
      const anchor = anchorRef.current;
      const target = e.target as Node;
      if (
        popup &&
        !popup.contains(target) &&
        anchor &&
        !anchor.contains(target)
      ) {
        onClose();
      }
    };
    const timeout = window.setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorRef, onClose]);

  if (coords === null) {
    return null;
  }

  const node = (
    <div
      ref={popupRef}
      className="flex -translate-x-1/2 gap-1.5 rounded-lg border border-violet-400/40 bg-violet-950/95 p-2 shadow-xl backdrop-blur-sm"
      style={{
        position: "fixed",
        top: coords.top,
        left: coords.left,
        zIndex: Z_INDEX.creatorPopover,
        minWidth: "fit-content",
      }}
      role="presentation"
    >
      {COLOR_LIST.map((color, idx) => (
        <button
          key={color}
          type="button"
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

  return createPortal(node, document.body);
}
