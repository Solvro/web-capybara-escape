import { cn } from "@/lib/utils";

interface CharacterSelectorImageProps {
  src: string;
  alt: string;
  selected: boolean;
  highlighted?: boolean;
  scale?: number;
  percentageTopOffset?: number;
  percentageHorizontalOffset?: number;
}

export function CharacterSelectorImage({
  src,
  alt,
  selected,
  highlighted = false,
  scale = 1,
  percentageTopOffset = 0,
  percentageHorizontalOffset = 0,
}: CharacterSelectorImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={{
        width: `${70 * scale}%`,
        top: `${percentageTopOffset}%`,
        left: `${50 + percentageHorizontalOffset}%`,
        transform: "translateX(-50%)",
      }}
      className={cn(
        "pointer-events-none absolute mx-auto h-auto object-contain",
        "transition-opacity duration-150",
        highlighted
          ? selected
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
          : selected
            ? "opacity-0"
            : "opacity-100 group-hover:opacity-0",
      )}
    />
  );
}
