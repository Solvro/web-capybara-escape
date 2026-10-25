import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RoomsApi from "@/api/rooms-api";
import { useRoom } from "@/lib/use-room";

export type LobbyGuardStatus = "checking" | "ready" | "not-found";

export function useLobbyGuard(roomCode: string, sequence: string | null) {
  const navigate = useNavigate();
  const { room, isConnected, activeRoomCode, reconnectionStatus } = useRoom();
  const [status, setStatus] = useState<LobbyGuardStatus>("checking");

  const connectedToThisRoom =
    room !== null && isConnected && activeRoomCode === roomCode;

  useEffect(() => {
    if (roomCode === "") {
      void navigate("/", { replace: true });
      return;
    }

    if (connectedToThisRoom) {
      setStatus("ready");
      return;
    }

    if (reconnectionStatus === "pending") {
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const lookup = await RoomsApi.getRoomByCode(roomCode);
        if (cancelled) return;

        if (!lookup.exists) {
          setStatus("not-found");
          return;
        }

        const query = sequence
          ? `?code=${roomCode}&sequence=${sequence}`
          : `?code=${roomCode}`;
        navigate(`/${query}`, { replace: true });
      } catch {
        if (!cancelled) {
          setStatus("not-found");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [connectedToThisRoom, reconnectionStatus, roomCode, navigate, sequence]);

  return connectedToThisRoom ? "ready" : status;
}
