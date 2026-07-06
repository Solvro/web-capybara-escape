import { Palette, RotateCw } from "lucide-react";
import { useRef, useState } from "react";

import {
  COLORABLE_BASE_ITEMS,
  type FloorDecoyRotationDeg,
  type LayerItem,
  creatorPaletteKeyForLookup,
  getColoredVariant,
  getGridItems,
  getRotatedFloorPlacementItem,
  isRotatableFloorBaseKey,
  paletteDisplayLabel,
  parseRotatableFloorKey,
} from "../../../../constants/layer-items";
import {
  getEntityRenderData,
  getUIBlockBackgroundData,
} from "../../../../utils/tileset-utils";
import { CreatorEntityPreview } from "../../shared/creator-entity-preview";
import { renderTilesetLayer } from "../../shared/render-tileset-layer";
import { CreatorColorPicker } from "./creator-color-picker";

interface CreatorLayerOptionsGridProps {
  layerKey: string;
  activeBlock: LayerItem | null;
  setActiveBlock: (block: LayerItem | null) => void;
  floorCableRotationByBase: Record<string, FloorDecoyRotationDeg>;
  rotateCableAtBase: (baseKey: string) => void;
}

export function CreatorLayerOptionsGrid({
  layerKey,
  activeBlock,
  setActiveBlock,
  floorCableRotationByBase,
  rotateCableAtBase,
}: CreatorLayerOptionsGridProps) {
  const items = getGridItems(layerKey);

  const [openPickerBaseKey, setOpenPickerBaseKey] = useState<string | null>(
    null,
  );

  const [selectedColors, setSelectedColors] = useState<Record<string, number>>(
    {},
  );

  const pickerAnchorRef = useRef<HTMLDivElement | null>(null);

  const getDisplayItem = (item: LayerItem): LayerItem => {
    let out = item;
    if (out.colorable && out.baseKey) {
      const colorIdx = selectedColors[out.baseKey] ?? 0;
      out = getColoredVariant(out.baseKey, colorIdx) ?? out;
    }
    if (item.supportsRotation && isRotatableFloorBaseKey(item.key)) {
      const deg = floorCableRotationByBase[item.key] ?? 0;
      return getRotatedFloorPlacementItem(item.key, deg) ?? out;
    }
    return out;
  };

  const isItemActive = (item: LayerItem): boolean => {
    if (!activeBlock) return false;
    if (item.supportsRotation) {
      const p = parseRotatableFloorKey(activeBlock.key);
      return p?.baseKey === item.key;
    }
    if (item.colorable && item.baseKey) {
      return activeBlock.baseKey === item.baseKey;
    }
    return activeBlock.key === item.key;
  };

  const handleItemClick = (item: LayerItem) => {
    const displayItem = getDisplayItem(item);
    setActiveBlock(displayItem);
  };

  const handleColorSelect = (baseKey: string, colorIndex: number) => {
    setSelectedColors((prev) => ({ ...prev, [baseKey]: colorIndex }));
    const variant = getColoredVariant(baseKey, colorIndex);
    if (variant) {
      setActiveBlock(variant);
    }
    setOpenPickerBaseKey(null);
  };

  const handleExpandClick = (e: React.MouseEvent, baseKey: string) => {
    e.stopPropagation();
    setOpenPickerBaseKey((prev) => (prev === baseKey ? null : baseKey));
  };

  const handleRotateClick = (e: React.MouseEvent, baseKey: string) => {
    e.stopPropagation();
    if (isRotatableFloorBaseKey(baseKey)) {
      rotateCableAtBase(baseKey);
    }
  };

  const paletteRowKeyForItem = (item: LayerItem) =>
    item.colorable && item.baseKey ? item.baseKey : item.key;

  return (
    <div className="custom-scrollbar flex min-h-0 flex-1 flex-wrap content-start items-start justify-center gap-4 overflow-y-auto rounded-lg bg-violet-900/40 p-4">
      {items.map((item) => {
        const displayItem = getDisplayItem(item);
        const isActive = isItemActive(item);
        const isColorable = Boolean(item.colorable && item.baseKey);
        const hasVariants =
          isColorable && (COLORABLE_BASE_ITEMS[item.baseKey!]?.length ?? 0) > 1;
        const canRotate =
          Boolean(item.supportsRotation) && isRotatableFloorBaseKey(item.key);

        const paletteRowKey = creatorPaletteKeyForLookup(
          paletteRowKeyForItem(item),
        );

        const useCompositeBlend =
          displayItem.baseFrame !== undefined || Boolean(displayItem.color);

        const needsRotatePreview =
          displayItem.rotationDeg != null &&
          displayItem.rotationDeg % 360 !== 0;

        const entityPreview = getEntityRenderData(
          displayItem.frame,
          24,
          import.meta.env.BASE_URL,
        );

        const previewUsesTilesetLayers =
          useCompositeBlend || needsRotatePreview;

        const { bgUrl, bgPosX, bgPosY } = getUIBlockBackgroundData(
          displayItem.frame,
          24,
          import.meta.env.BASE_URL,
        );

        const paletteName = paletteDisplayLabel(displayItem);
        const rotatedKey = parseRotatableFloorKey(displayItem.key);
        const tileHoverTitle =
          rotatedKey !== null &&
          rotatedKey.rotationDeg % 360 !== 0 &&
          item.supportsRotation
            ? `${paletteName} · ${rotatedKey.rotationDeg}°`
            : paletteName;

        return (
          <div
            key={paletteRowKey}
            ref={
              openPickerBaseKey === item.baseKey ? pickerAnchorRef : undefined
            }
            className="relative w-[5rem] shrink-0"
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                handleItemClick(item);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleItemClick(item);
                }
              }}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-md p-2 transition-colors ${
                isActive
                  ? "bg-amber-400/30 ring-2 ring-amber-400"
                  : "hover:bg-violet-500/40"
              }`}
              title={tileHoverTitle}
            >
              <div className="relative h-20 w-20 overflow-hidden border-4 border-emerald-950 bg-blue-400">
                {entityPreview ? (
                  <div className="flex h-full w-full items-end justify-center">
                    <CreatorEntityPreview entity={entityPreview} scale={2.5} />
                  </div>
                ) : !previewUsesTilesetLayers ? (
                  <div
                    className="h-6 w-6"
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
                  />
                ) : (
                  <div
                    style={{
                      transform: "scale(3)",
                      transformOrigin: "top left",
                      width: "24px",
                      height: "24px",
                      position: "relative",
                    }}
                  >
                    {displayItem.baseFrame !== undefined &&
                      renderTilesetLayer({
                        frameId: displayItem.baseFrame,
                        direction: displayItem.direction,
                        rotationDeg: displayItem.rotationDeg,
                      })}
                    {renderTilesetLayer({
                      frameId: displayItem.frame,
                      color: displayItem.color,
                      direction: displayItem.direction,
                      rotationDeg: displayItem.rotationDeg,
                    })}
                  </div>
                )}

                {(canRotate || hasVariants) && (
                  <div className="absolute bottom-0.5 right-0.5 flex flex-row-reverse items-center gap-0.5">
                    {hasVariants && (
                      <button
                        type="button"
                        onClick={(e) => {
                          handleExpandClick(e, item.baseKey!);
                        }}
                        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-violet-900/80 text-violet-200 transition-colors hover:bg-violet-700/90 hover:text-white"
                        aria-label="Choose palette color"
                        title="Choose color"
                      >
                        <Palette
                          className="h-4 w-4"
                          aria-hidden
                          strokeWidth={2}
                        />
                      </button>
                    )}
                    {canRotate && (
                      <button
                        type="button"
                        onClick={(e) => {
                          handleRotateClick(e, item.key);
                        }}
                        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-violet-900/80 text-violet-200 transition-colors hover:bg-violet-700/90 hover:text-white"
                        aria-label="Rotate cable (R)"
                        title="Rotate (R)"
                      >
                        <RotateCw
                          className="h-4 w-4"
                          aria-hidden
                          strokeWidth={2}
                        />
                      </button>
                    )}
                  </div>
                )}

                {Boolean(isColorable && displayItem.color) && (
                  <div
                    className="absolute top-0.5 right-0.5 h-3 w-3 rounded-full border border-white/50"
                    style={{ backgroundColor: displayItem.color }}
                  />
                )}
              </div>
              <span className="block w-full text-balance break-words px-0.5 text-center text-[10px] leading-tight font-medium text-violet-200 hyphens-auto">
                {paletteName}
              </span>
            </div>

            {openPickerBaseKey === item.baseKey && hasVariants && (
              <CreatorColorPicker
                anchorRef={pickerAnchorRef}
                selectedColorIndex={selectedColors[item.baseKey!] ?? 0}
                onSelectColor={(colorIndex) => {
                  handleColorSelect(item.baseKey!, colorIndex);
                }}
                onClose={() => {
                  setOpenPickerBaseKey(null);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
