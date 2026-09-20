import type { CSSProperties } from "react";

import { IMAGE_LOBBY_PATHS } from "@/constants/global";
import { cn } from "@/lib/utils";
import type { IntroCharacter } from "@/types/lobby/intro-character";

export interface CharacterSelectorProps {
  disabled?: boolean;
  selected: boolean;
  onSelect: () => void;
  character: IntroCharacter;
  className?: string;
  facing?: "left" | "right";
  textColor?: string;
  glowColor?: string;
  characterScale?: number;
  percentageTopOffset?: number;
  percentageHorizontalOffset?: number;
  optionalDescription?: string;
}

function MonitorImage({ selected }: { selected: boolean }) {
  return (
    <img
      src={IMAGE_LOBBY_PATHS.MONITOR}
      alt=""
      draggable={false}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-contain",
        "transition-[filter] duration-200",
        "group-hover:brightness-125 group-hover:saturate-150 group-hover:glow",
        selected && "brightness-125 saturate-150 glow",
      )}
    />
  );
}

function CharacterSelectorImage({
  src,
  alt,
  selected,
  highlighted = false,
  scale = 1,
  percentageTopOffset = 0,
  percentageHorizontalOffset = 0,
}: {
  src: string;
  alt: string;
  selected: boolean;
  highlighted?: boolean;
  scale?: number;
  percentageTopOffset?: number;
  percentageHorizontalOffset?: number;
}) {
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

export function CharacterSelector({
  disabled = false,
  selected,
  onSelect,
  character,
  className = "h-80 w-80",
  facing = "right",
  textColor = "#ffffff",
  glowColor = "#ef4444",
  characterScale = 1,
  percentageTopOffset = 0,
  percentageHorizontalOffset = 0,
  optionalDescription = "",
}: CharacterSelectorProps) {
  return (
    <div
      className={cn(
        "group relative shrink-0 transition-[filter,opacity] duration-200",
        className,
        disabled && "pointer-events-none cursor-not-allowed",
        disabled && !selected && "opacity-40 brightness-50 grayscale",
        disabled && selected && "opacity-70 brightness-75",
      )}
      style={
        {
          "--glow-color": glowColor,
          "--accent-color": textColor,
        } as CSSProperties
      }
      aria-disabled={disabled}
    >
      <button
        type="button"
        onClick={onSelect}
        disabled={disabled}
        aria-pressed={selected}
        className={cn(
          "relative h-full w-full shrink-0",
          "transition-all duration-200",
          facing === "left" && "-scale-x-100",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <MonitorImage selected={selected} />
        <CharacterSelectorImage
          src={character.imagePath}
          alt=""
          selected={selected}
          scale={characterScale}
          percentageTopOffset={percentageTopOffset}
          percentageHorizontalOffset={percentageHorizontalOffset}
        />
        <CharacterSelectorImage
          src={character.imageHighlightPath}
          alt={character.name}
          selected={selected}
          highlighted
          scale={characterScale}
          percentageTopOffset={percentageTopOffset}
          percentageHorizontalOffset={percentageHorizontalOffset}
        />
      </button>

      <div className="mt-2 flex flex-col items-center text-center">
        <p
          className={cn(
            "text-2xl text-white transition-colors duration-200",
            !disabled &&
              "cursor-pointer group-hover:text-[var(--accent-color)] group-hover:glow",
            selected && "text-[var(--accent-color)] glow",
            disabled ? "cursor-not-allowed" : selected && "cursor-default",
          )}
        >
          {character.name}
        </p>
        <p
          className={cn(
            "tomorrow-font overflow-hidden text-lg text-[var(--accent-color)]",
            "max-h-0 translate-y-1 opacity-0",
            "transition-all duration-300 ease-out",
            !disabled &&
              "group-hover:mt-2 group-hover:max-h-16 group-hover:translate-y-4 group-hover:opacity-100",
            selected && "mt-2 max-h-16 translate-y-4 opacity-100",
          )}
        >
          {optionalDescription
            ? `${character.description} (${optionalDescription})`
            : character.description}
        </p>
      </div>
    </div>
  );
}
