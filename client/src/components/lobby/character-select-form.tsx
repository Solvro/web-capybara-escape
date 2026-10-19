import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/custom-input";

interface CharacterSelectFormProps {
  mode: "create" | "invite";
  isSubmitting: boolean;
  isInviteReady: boolean;
  selectedCharacterLabel: string;
  inviteCode?: string;
  onCreateRoom: (name: string) => void;
  onJoinByCode: (name: string, code: string) => void;
}

export function CharacterSelectForm({
  mode,
  isSubmitting,
  isInviteReady,
  selectedCharacterLabel,
  inviteCode = "",
  onCreateRoom,
  onJoinByCode,
}: CharacterSelectFormProps) {
  const [name, setName] = useState("");
  const [manualCode, setManualCode] = useState("");

  const isInvite = mode === "invite";

  const submitPrimary = () => {
    if (isInvite) {
      onJoinByCode(name, inviteCode);
    } else {
      onCreateRoom(name);
    }
  };

  const submitManualJoin = () => {
    onJoinByCode(name, manualCode);
  };

  const handleEnter =
    (action: () => void): React.KeyboardEventHandler<HTMLInputElement> =>
    (event) => {
      if (event.key === "Enter" && !isSubmitting) {
        action();
      }
    };

  const primaryDisabled =
    isSubmitting || name.trim() === "" || (isInvite && !isInviteReady);

  return (
    <div className="flex flex-col items-center gap-4 pt-8">
      <p className="text-md text-white">WSKOCZ DO GRY</p>
      <div className="flex flex-col items-center">
        <p className="text-lg text-white tomorrow-font mb-2">Twój Nick</p>
        <CustomInput
          value={name}
          placeholder="Elek..."
          setValue={(value) => setName(value.toUpperCase())}
          onKeyDown={handleEnter(submitPrimary)}
          disabled={isSubmitting}
          className="my-2"
        />
        <p className="text-md text-white tomorrow-font mt-4">
          Wybrana postać: {selectedCharacterLabel}
        </p>
      </div>

      <Button
        onClick={submitPrimary}
        disabled={primaryDisabled}
        className="w-full tomorrow-font font-bold py-2 mt-12"
      >
        {isSubmitting
          ? "Ładowanie..."
          : isInvite
            ? "Dołącz do pokoju"
            : "Stwórz nowy pokój"}
      </Button>

      {isInvite ? (
        <div className="flex flex-col items-center my-2">
          <CustomInput
            value={inviteCode}
            placeholder="Twój kod pokoju"
            setValue={() => {}}
            disabled={true}
          />
        </div>
      ) : (
        <>
          <p className="text-md text-white mt-2">LUB</p>

          <div className="flex flex-col items-center my-2">
            <CustomInput
              value={manualCode}
              placeholder="Twój kod pokoju"
              setValue={(value) => setManualCode(value.toUpperCase())}
              onKeyDown={handleEnter(submitManualJoin)}
              disabled={isSubmitting}
            />
            <Button
              onClick={submitManualJoin}
              disabled={isSubmitting || manualCode.trim() === ""}
              className="w-full tomorrow-font font-bold py-2 my-4"
            >
              Dołącz do pokoju
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
