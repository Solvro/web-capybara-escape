import { useMemo } from "react";

import { cn } from "@/lib/utils";
import type { IntroCharacter } from "@/types/lobby/intro-character";

interface UseCharacterSelectorAppearanceParams {
  disabled: boolean;
  selected: boolean;
  facing: "left" | "right";
  character: IntroCharacter;
  optionalDescription?: string;
}

export function useCharacterSelectorAppearance({
  disabled,
  selected,
  facing,
  character,
  optionalDescription,
}: UseCharacterSelectorAppearanceParams) {
  return useMemo(() => {
    const containerClassName = cn(
      "group relative shrink-0 transition-[filter,opacity] duration-200",
      disabled && "pointer-events-none cursor-not-allowed",
      disabled && !selected && "opacity-40 brightness-50 grayscale",
      disabled && selected && "opacity-70 brightness-75",
    );

    const buttonClassName = cn(
      "relative h-full w-full shrink-0",
      "transition-all duration-200",
      facing === "left" && "-scale-x-100",
      disabled ? "cursor-not-allowed" : "cursor-pointer",
    );

    const nameClassName = cn(
      "text-2xl text-white transition-colors duration-200",
      !disabled &&
        "cursor-pointer group-hover:text-[var(--accent-color)] group-hover:glow",
      selected && "text-[var(--accent-color)] glow",
      disabled ? "cursor-not-allowed" : selected && "cursor-default",
    );

    const descriptionClassName = cn(
      "tomorrow-font overflow-hidden text-lg text-[var(--accent-color)]",
      "max-h-0 translate-y-1 opacity-0",
      "transition-all duration-300 ease-out",
      !disabled &&
        "group-hover:mt-2 group-hover:max-h-16 group-hover:translate-y-4 group-hover:opacity-100",
      selected && "mt-2 max-h-16 translate-y-4 opacity-100",
    );

    const descriptionText = optionalDescription
      ? `${character.description} (${optionalDescription})`
      : character.description;

    return {
      containerClassName,
      buttonClassName,
      nameClassName,
      descriptionClassName,
      descriptionText,
    };
  }, [disabled, selected, facing, character, optionalDescription]);
}
