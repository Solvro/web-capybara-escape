import {
  CharacterSelector,
  type CharacterSelectorProps,
} from "@/components/lobby/character-selector";
import { INTRO_CHARACTERS } from "@/constants/global";

type CharacterSelectorSolProps = Pick<
  CharacterSelectorProps,
  "selected" | "disabled" | "onSelect" | "optionalDescription"
>;

export function CharacterSelectorSol(props: CharacterSelectorSolProps) {
  return (
    <CharacterSelector
      {...props}
      character={INTRO_CHARACTERS.SOL}
      className="h-80 w-80"
      facing="right"
      textColor="#ff4f4f"
      glowColor="#ff4f4f"
      characterScale={1.1}
      percentageTopOffset={-5}
      percentageHorizontalOffset={16}
    />
  );
}
