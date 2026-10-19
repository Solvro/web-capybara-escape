import type { Character } from "@capybara/shared";
import { CHARACTER_LABELS, otherCharacter } from "@capybara/shared";

import { AlertModal } from "@/components/alert-modal";
import { INTRO_CHARACTERS } from "@/constants/global";

interface CharacterConflictAlertProps {
  takenCharacter: Character;
  takenByName: string;
  onClose: () => void;
  onJoinAsOther: () => void;
}

export function CharacterConflictAlert({
  takenCharacter,
  takenByName,
  onClose,
  onJoinAsOther,
}: CharacterConflictAlertProps) {
  const otherOne = otherCharacter(takenCharacter);
  const otherLabel = CHARACTER_LABELS[otherOne];

  return (
    <AlertModal
      title="Zmiana postaci"
      description={`Gracz w tym pokoju już wybrał postać: ${takenByName} (${CHARACTER_LABELS[takenCharacter]}). Musisz wybrać inną postać, aby dołączyć do gry. Czy chcesz dołączyć jako ${otherLabel}?`}
      imageUrl={INTRO_CHARACTERS[otherOne.toUpperCase()].imagePath}
      onClose={onClose}
      actionText={`Dołącz jako ${otherLabel}`}
      onAction={onJoinAsOther}
    />
  );
}
