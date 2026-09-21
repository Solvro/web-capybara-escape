import type { Character } from "@capybara/shared";
import { useEffect, useState } from "react";

import RoomsApi from "@/api/rooms-api";

export type InviteLookupStatus =
  | "checking"
  | "ready"
  | "not-found"
  | "unavailable";

export function useRoomInviteLookup(inviteCode: string) {
  const isInviteMode = inviteCode !== "";

  const [status, setStatus] = useState<InviteLookupStatus>(
    isInviteMode ? "checking" : "ready",
  );
  const [takenCharacter, setTakenCharacter] = useState<Character | null>(null);
  const [takenByName, setTakenByName] = useState("");

  useEffect(() => {
    if (!isInviteMode) {
      setStatus("ready");
      return;
    }

    let cancelled = false;
    setStatus("checking");

    void (async () => {
      try {
        const lookup = await RoomsApi.getRoomByCode(inviteCode);
        if (cancelled) return;

        if (!lookup.exists) {
          setStatus("not-found");
          return;
        }

        if (lookup.phase === "playing" || (lookup.players?.length ?? 0) >= 2) {
          setStatus("unavailable");
          return;
        }

        const takenPlayer = lookup.players?.[0];
        if (takenPlayer) {
          setTakenCharacter(takenPlayer.character);
          setTakenByName(takenPlayer.name);
        }
        setStatus("ready");
      } catch {
        if (!cancelled) {
          setStatus("not-found");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isInviteMode, inviteCode]);

  return { isInviteMode, status, takenCharacter, takenByName };
}
