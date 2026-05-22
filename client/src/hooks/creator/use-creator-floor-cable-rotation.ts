import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";

import type {
  FloorDecoyRotationDeg,
  LayerItem,
} from "../../constants/layer-items";
import {
  getRotatedFloorPlacementItem,
  isRotatableFloorBaseKey,
  nextFloorDecoyQuarterTurn,
  parseRotatableFloorKey,
} from "../../constants/layer-items";

export function useCreatorFloorCableRotation(
  activeBlock: LayerItem | null,
  setActiveBlock: Dispatch<SetStateAction<LayerItem | null>>,
): {
  floorCableRotationByBase: Record<string, FloorDecoyRotationDeg>;
  rotateCableAtBase: (baseKey: string) => void;
} {
  const [floorCableRotationByBase, setFloorCableRotationByBase] = useState<
    Record<string, FloorDecoyRotationDeg>
  >({});

  const rotateCableAtBase = useCallback(
    (baseKey: string) => {
      if (!isRotatableFloorBaseKey(baseKey)) return;
      let cur: FloorDecoyRotationDeg = floorCableRotationByBase[baseKey] ?? 0;
      const parsed = activeBlock?.key
        ? parseRotatableFloorKey(activeBlock.key)
        : null;
      if (parsed?.baseKey === baseKey) cur = parsed.rotationDeg;
      const nextDeg = nextFloorDecoyQuarterTurn(cur);
      const nextItem = getRotatedFloorPlacementItem(baseKey, nextDeg);
      setFloorCableRotationByBase((p) => ({ ...p, [baseKey]: nextDeg }));
      if (nextItem) {
        setActiveBlock((ab) => {
          if (!ab?.key) return ab;
          const r = parseRotatableFloorKey(ab.key);
          if (r?.baseKey !== baseKey) return ab;
          return nextItem;
        });
      }
    },
    [activeBlock, floorCableRotationByBase, setActiveBlock],
  );

  useEffect(() => {
    const p = activeBlock?.key ? parseRotatableFloorKey(activeBlock.key) : null;
    if (!p) return;
    setFloorCableRotationByBase((prev) => {
      if (prev[p.baseKey] === p.rotationDeg) return prev;
      return { ...prev, [p.baseKey]: p.rotationDeg };
    });
  }, [activeBlock?.key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "r" && e.key !== "R") return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select") || t?.isContentEditable) {
        return;
      }
      const r = activeBlock?.key
        ? parseRotatableFloorKey(activeBlock.key)
        : null;
      if (!r) return;
      e.preventDefault();
      rotateCableAtBase(r.baseKey);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeBlock, rotateCableAtBase]);

  return { floorCableRotationByBase, rotateCableAtBase };
}
