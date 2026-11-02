import type { Character } from "@capybara/shared";
import { CHARACTER_LABELS, otherCharacter } from "@capybara/shared";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { AlertModal } from "@/components/alert-modal";
import { CharacterConflictAlert } from "@/components/lobby/character-conflict-alert";
import { CharacterSelectForm } from "@/components/lobby/character-select-form";
import { CharacterSelectorSol } from "@/components/lobby/character-selector-sol";
import { CharacterSelectorVron } from "@/components/lobby/character-selector-vron";
import { ReconnectingPanel } from "@/components/lobby/reconnecting-panel";
import { IMAGE_ALERT_PATHS, INTRO_CHARACTERS } from "@/constants/global";
import { useJoinOrCreateRoom } from "@/hooks/lobby/use-join-or-create-room";
import { useReconnectionRedirect } from "@/hooks/lobby/use-reconnection-redirect";
import { useRoomInviteLookup } from "@/hooks/lobby/use-room-invite-lookup";
import { usePreloadImages } from "@/hooks/use-preloaded-image";

import { IntroContainer } from "../components/intro-container";
import { TitleHeader } from "../components/ui/title-header";
import { NotFoundRoom } from "./not-found-room";

const LOBBY_WARMUP_IMAGES = [
  INTRO_CHARACTERS.SOL.imagePath,
  INTRO_CHARACTERS.SOL.imageHighlightPath,
  INTRO_CHARACTERS.VRON.imagePath,
  INTRO_CHARACTERS.VRON.imageHighlightPath,
  IMAGE_ALERT_PATHS.FAILED_OR_LOST,
] as const;

export function CharacterSelect() {
  usePreloadImages(LOBBY_WARMUP_IMAGES);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const screenSequenceSlug = searchParams.get("sequence") ?? undefined;
  const inviteCode = (searchParams.get("code") ?? "").trim().toUpperCase();

  const { isReconnecting, countdown, cancel } = useReconnectionRedirect();
  const invite = useRoomInviteLookup(inviteCode);
  const {
    isSubmitting,
    alert,
    dismissAlert,
    createNewRoom,
    joinExistingRoom,
    joinAsOtherCharacter,
  } = useJoinOrCreateRoom(screenSequenceSlug);

  const [selectedCharacter, setSelectedCharacter] = useState<Character>("sol");

  useEffect(() => {
    if (invite.takenCharacter) {
      setSelectedCharacter(otherCharacter(invite.takenCharacter));
    }
  }, [invite.takenCharacter]);

  if (invite.isInviteMode && invite.status === "not-found") {
    return <NotFoundRoom />;
  }

  const solTaken = invite.takenCharacter === "sol";
  const vronTaken = invite.takenCharacter === "vron";

  return (
    <IntroContainer>
      <TitleHeader title="Capybara Escape" />

      {isReconnecting ? (
        <ReconnectingPanel countdown={countdown} onCancel={cancel} />
      ) : invite.isInviteMode && invite.status === "unavailable" ? (
        <AlertModal
          title="Pokój niedostępny"
          description="Ten pokój jest już pełny albo gra już się zaczęła."
          closeText="Wróć do menu"
          onClose={() => navigate("/", { replace: true })}
        />
      ) : (
        <div className="flex flex-row justify-between items-center w-3/4">
          <CharacterSelectorSol
            disabled={invite.isInviteMode || solTaken}
            selected={selectedCharacter === "sol"}
            onSelect={() => {
              if (!invite.isInviteMode) setSelectedCharacter("sol");
            }}
            optionalDescription={
              solTaken
                ? `${invite.takenByName} - Już wybrany przez zapraszającego`
                : undefined
            }
          />

          <CharacterSelectForm
            mode={invite.isInviteMode ? "invite" : "create"}
            isSubmitting={isSubmitting}
            isInviteReady={invite.status === "ready"}
            selectedCharacterLabel={CHARACTER_LABELS[selectedCharacter]}
            inviteCode={inviteCode}
            onCreateRoom={(name) => void createNewRoom(name, selectedCharacter)}
            onJoinByCode={(name, code) =>
              void joinExistingRoom(code, name, selectedCharacter)
            }
          />

          <CharacterSelectorVron
            disabled={invite.isInviteMode || vronTaken}
            selected={selectedCharacter === "vron"}
            onSelect={() => {
              if (!invite.isInviteMode) setSelectedCharacter("vron");
            }}
            optionalDescription={
              vronTaken
                ? `${invite.takenByName} - Już wybrany przez zapraszającego`
                : undefined
            }
          />
        </div>
      )}

      {alert?.kind === "generic" && (
        <AlertModal
          title="Wpadka!"
          description={alert.message}
          onClose={dismissAlert}
        />
      )}
      {alert?.kind === "character-taken" && (
        <CharacterConflictAlert
          takenCharacter={alert.takenCharacter}
          takenByName={alert.takenByName}
          onClose={dismissAlert}
          onJoinAsOther={() => void joinAsOtherCharacter()}
        />
      )}
    </IntroContainer>
  );
}
