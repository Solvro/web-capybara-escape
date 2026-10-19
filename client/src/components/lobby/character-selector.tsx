import type { CSSProperties } from "react";

import { CharacterSelectorImage } from "@/components/lobby/character-selector-image";
import { MonitorImage } from "@/components/lobby/monitor-image";
import { useCharacterSelectorAppearance } from "@/hooks/lobby/use-character-selector-appearance";
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
  const {
    containerClassName,
    buttonClassName,
    nameClassName,
    descriptionClassName,
    descriptionText,
  } = useCharacterSelectorAppearance({
    disabled,
    selected,
    facing,
    character,
    optionalDescription,
  });

  return (
    <div
      className={cn(containerClassName, className)}
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
        className={buttonClassName}
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
        <p className={nameClassName}>{character.name}</p>
        <p className={descriptionClassName}>{descriptionText}</p>
      </div>
    </div>
  );
}
