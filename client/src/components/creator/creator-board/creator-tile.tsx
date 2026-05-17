import {
  EXTRA_HEIGHT,
  TALL_WALL_HEIGHT_MULTIPLIER,
} from "../../../constants/global";
import {
  ALL_ITEMS_MAP,
  type LayerItem,
} from "../../../constants/layer-items";
import {
  getTileBackgroundData,
  getTilesetBackgroundPosition,
} from "../../../utils/tileset-utils";

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

  /** Background layer decides wall tiling / vertical placement. */
  const wallBg = resolvedItems[1];
  const isWallCell =
    wallBg?.key === "w1t" || wallBg?.key === "w2t";

  const renderPart = (
    frameId: number,
    color?: string,
    direction?: string,
  ) => {
    const { x: px, y: py } = getTilesetBackgroundPosition(
      frameId,
      6,
      sourceTileSizePx,
      true,
    );

    const innerTransform = direction === "left" ? "scaleX(-1)" : "none";

    if (color) {
      return (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${sourceTileSizePx}px`,
            height: `${sourceTileSizePx * TALL_WALL_HEIGHT_MULTIPLIER}px`,
            backgroundColor: color,
            maskImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
            maskPosition: `${px}px ${py}px`,
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
            WebkitMaskPosition: `${px}px ${py}px`,
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
          width: `${sourceTileSizePx}px`,
          height: `${sourceTileSizePx * TALL_WALL_HEIGHT_MULTIPLIER}px`,
          backgroundImage: `url(${import.meta.env.BASE_URL}images/capybara-tileset.png)`,
          backgroundPosition: `${px}px ${py}px`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          transform: innerTransform,
          transformOrigin: "center center",
        }}
      />
    );
  };

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

        const { isEntity, isTall, bgUrl, bgPosX, bgPosY } =
          getTileBackgroundData(
            item.frame,
            sourceTileSizePx,
            import.meta.env.BASE_URL,
          );

        const topPosition =
          isWallCell || isTall ? 0 : `${sizePx * EXTRA_HEIGHT}px`;

        const useCompositeBlend =
          item.baseFrame !== undefined || Boolean(item.color);

        if (isEntity) {
          return (
            <div
              key={layerId}
              style={{
                position: "absolute",
                top: topPosition,
                left: 0,
                width: `${sourceTileSizePx}px`,
                height: `${sourceTileSizePx * TALL_WALL_HEIGHT_MULTIPLIER}px`,
                backgroundImage: bgUrl,
                backgroundPosition: `${bgPosX}px ${bgPosY}px`,
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            />
          );
        }

        if (!useCompositeBlend) {
          return (
            <div
              key={layerId}
              style={{
                position: "absolute",
                top: topPosition,
                left: 0,
                width: `${sourceTileSizePx}px`,
                height: `${sourceTileSizePx * TALL_WALL_HEIGHT_MULTIPLIER}px`,
                backgroundImage: bgUrl,
                backgroundPosition: `${bgPosX}px ${bgPosY}px`,
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            />
          );
        }

        return (
          <div
            key={layerId}
            style={{
              position: "absolute",
              top: topPosition,
              left: 0,
              width: `${sourceTileSizePx}px`,
              height: `${sourceTileSizePx * TALL_WALL_HEIGHT_MULTIPLIER}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              pointerEvents: "none",
            }}
          >
            {item.baseFrame !== undefined &&
              renderPart(item.baseFrame, undefined, item.direction)}
            {renderPart(item.frame, item.color, item.direction)}
          </div>
        );
      })}
    </div>
  );
}
