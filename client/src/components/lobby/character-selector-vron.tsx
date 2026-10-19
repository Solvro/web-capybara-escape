import {
  CharacterSelector,
  type CharacterSelectorProps,
} from "@/components/lobby/character-selector";
import { INTRO_CHARACTERS } from "@/constants/global";

type CharacterSelectorVronProps = Pick<
  CharacterSelectorProps,
  "selected" | "disabled" | "onSelect" | "optionalDescription"
>;

export function CharacterSelectorVron(props: CharacterSelectorVronProps) {
  return (
    <CharacterSelector
      {...props}
      character={INTRO_CHARACTERS.VRON}
      className="h-80 w-80"
      facing="left"
      textColor="#fad37f"
      glowColor="#fad37f"
      characterScale={1.2}
      percentageTopOffset={-12}
      percentageHorizontalOffset={20}
    />
  );
}
