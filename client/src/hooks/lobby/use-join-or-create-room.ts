import type { Character } from "@capybara/shared";
import { otherCharacter } from "@capybara/shared";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RoomsApi from "@/api/rooms-api";
import { useRoom } from "@/lib/use-room";

export type JoinOrCreateAlert =
  | { kind: "generic"; message: string }
  | {
      kind: "character-taken";
      code: string;
      name: string;
      takenCharacter: Character;
      takenByName: string;
    };

export function useJoinOrCreateRoom(screenSequenceSlug?: string) {
  const navigate = useNavigate();
  const { createRoom, joinRoomByCode } = useRoom();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<JoinOrCreateAlert | null>(null);

  const dismissAlert = () => setAlert(null);

  const createNewRoom = async (rawName: string, character: Character) => {
    const name = rawName.trim();
    if (name === "") {
      setAlert({
        kind: "generic",
        message: "Nazwa gracza nie może być pusta.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const code = await RoomsApi.reserveRoomCode();
      await createRoom({ name, character, code, screenSequenceSlug });
      navigate(`/lobby/${code}`);
    } catch {
      setAlert({
        kind: "generic",
        message: "Nie udało się stworzyć pokoju. Spróbuj ponownie.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const joinExistingRoom = async (
    rawCode: string,
    rawName: string,
    character: Character,
  ) => {
    const name = rawName.trim();
    const code = rawCode.trim().toUpperCase();

    if (name === "") {
      setAlert({
        kind: "generic",
        message: "Nazwa gracza nie może być pusta.",
      });
      return;
    }
    if (code === "") {
      setAlert({ kind: "generic", message: "Podaj kod pokoju." });
      return;
    }

    setIsSubmitting(true);
    try {
      await joinRoomByCode({ name, character, code });
      navigate(`/lobby/${code}`);
      return;
    } catch {
      // fall through to figure out why below
    } finally {
      setIsSubmitting(false);
    }

    try {
      const lookup = await RoomsApi.getRoomByCode(code);
      const conflictingPlayer = lookup.players?.find(
        (player) => player.character === character,
      );

      if (lookup.exists && conflictingPlayer) {
        setAlert({
          kind: "character-taken",
          code,
          name,
          takenCharacter: character,
          takenByName: conflictingPlayer.name,
        });
        return;
      }
    } catch {
      // ignore, fall back to the generic error below
    }

    setAlert({
      kind: "generic",
      message:
        "Nie udało się dołączyć do pokoju. Sprawdź kod i spróbuj ponownie.",
    });
  };

  const joinAsOtherCharacter = async () => {
    if (!alert || alert.kind !== "character-taken") return;
    const { code, name, takenCharacter } = alert;
    setAlert(null);
    await joinExistingRoom(code, name, otherCharacter(takenCharacter));
  };

  return {
    isSubmitting,
    alert,
    dismissAlert,
    createNewRoom,
    joinExistingRoom,
    joinAsOtherCharacter,
  };
}
