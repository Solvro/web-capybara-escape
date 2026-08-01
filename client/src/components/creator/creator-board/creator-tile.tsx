import {
  EXTRA_HEIGHT,
  LAYER_NAMES,
  TALL_WALL_HEIGHT_MULTIPLIER,
} from "../../../constants/global";
import {
  ALL_ITEMS_MAP,
  LAYER_ITEM_KEYS,
  type LayerItem,
} from "../../../constants/layer-items";
import { getEntityRenderData } from "../../../utils/tileset-utils";
import { renderTilesetLayer } from "../shared/render-tileset-layer";

interface CreatorTileProps {
  sizePx: number;
  tileKeys: (string | null)[];
}

export function CreatorTile({ sizePx, tileKeys }: CreatorTileProps) {
  const sourceTileSizePx = 24;
  const scale = sizePx / sourceTileSizePx;

  const safeKeys =
    Array.isArray(tileKeys) && tileKeys.length === 5
      ? tileKeys
      : [null, null, null, null, null];

  const resolvedItems: (LayerItem | null)[] = safeKeys.map((key) =>
    key ? (ALL_ITEMS_MAP[key] ?? null) : null,
  );

  if (!resolvedItems.some((item) => item !== null)) {
    return (
      <div
        className="overflow-hidden border-4 border-emerald-950 bg-transparent"
        style={{
          width: `${sizePx}px`,
          height: `${sizePx}px`,
        }}
      />
    );
  }

  const wallBg = resolvedItems[1];
  const isWallCell = wallBg?.key === "w1t" || wallBg?.key === "w2t";

  return (
    <div
      className="overflow-hidden bg-blue-400"
      style={{
        position: "relative",
        width: `${sizePx}px`,
        height: `${sizePx * TALL_WALL_HEIGHT_MULTIPLIER}px`,
        marginTop: `${-sizePx * EXTRA_HEIGHT}px`,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {resolvedItems.map((item, layerId) => {
        if (item === null) return null;

        const entityRenderData = getEntityRenderData(
          item.frame,
          sourceTileSizePx,
          import.meta.env.BASE_URL,
        );

        const anchorsToFloor =
          item.key === LAYER_ITEM_KEYS.SOCKET ||
          item.key.startsWith(`${LAYER_ITEM_KEYS.SOCKET}-`);
        const topPosition =
          isWallCell && !anchorsToFloor ? 0 : `${sizePx * EXTRA_HEIGHT}px`;

        const useCompositeBlend =
          item.baseFrame !== undefined ||
          Boolean(item.color) ||
          (item.rotationDeg != null && item.rotationDeg % 360 !== 0);

        const isFloorDecoy = item.layer === LAYER_NAMES.FLOOR_DECOYS;
        const layerHeightMultiplier = isFloorDecoy
          ? 1
          : TALL_WALL_HEIGHT_MULTIPLIER;

        if (entityRenderData) {
          return (
            <div
              key={layerId}
              style={{
                position: "absolute",
                top: `${(entityRenderData.topSourcePx / sourceTileSizePx) * sizePx}px`,
                left: 0,
                width: `${entityRenderData.frameWidth}px`,
                height: `${entityRenderData.frameHeight}px`,
                backgroundImage: entityRenderData.bgUrl,
                backgroundPosition: `${entityRenderData.bgPosX}px ${entityRenderData.bgPosY}px`,
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            />
          );
        }

        const layerWrapperStyle = {
          position: "absolute" as const,
          top: topPosition,
          left: 0,
          width: `${sourceTileSizePx}px`,
          height: `${sourceTileSizePx * layerHeightMultiplier}px`,
          overflow: isFloorDecoy ? ("hidden" as const) : undefined,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none" as const,
        };

        if (!useCompositeBlend) {
          return (
            <div key={layerId} style={layerWrapperStyle}>
              {renderTilesetLayer({
                frameId: item.frame,
                tileSizePx: sourceTileSizePx,
                heightMultiplier: layerHeightMultiplier,
                withWallYOffset: !isFloorDecoy,
                rotationDeg: item.rotationDeg,
              })}
            </div>
          );
        }

        return (
          <div key={layerId} style={layerWrapperStyle}>
            {item.baseFrame !== undefined &&
              renderTilesetLayer({
                frameId: item.baseFrame,
                direction: item.direction,
                rotationDeg: item.rotationDeg,
                tileSizePx: sourceTileSizePx,
                heightMultiplier: layerHeightMultiplier,
                withWallYOffset: !isFloorDecoy,
              })}
            {renderTilesetLayer({
              frameId: item.frame,
              color: item.color,
              direction: item.direction,
              rotationDeg: item.rotationDeg,
              tileSizePx: sourceTileSizePx,
              heightMultiplier: layerHeightMultiplier,
              withWallYOffset: !isFloorDecoy,
            })}
          </div>
        );
      })}
    </div>
  );
}
