import { TALL_WALL_HEIGHT } from "../../../constants/global";
import type { EntityRenderData } from "../../../utils/tileset-utils";

interface CreatorEntityPreviewProps {
  entity: EntityRenderData;
  scale: number;
}

export function CreatorEntityPreview({
  entity,
  scale,
}: CreatorEntityPreviewProps) {
  return (
    <div
      style={{
        position: "relative",
        width: `${24 * scale}px`,
        height: `${TALL_WALL_HEIGHT * scale}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: `${entity.topSourcePx * scale}px`,
          left: 0,
          width: `${entity.frameWidth}px`,
          height: `${entity.frameHeight}px`,
          backgroundImage: entity.bgUrl,
          backgroundPosition: `${entity.bgPosX}px ${entity.bgPosY}px`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
