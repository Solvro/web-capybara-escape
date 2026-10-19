import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRoom } from "@/lib/use-room";

const COUNTDOWN_SECONDS = 3;

export function useReconnectionRedirect() {
  const navigate = useNavigate();
  const { room, isConnected, activeRoomCode, reconnectionStatus, disconnect } =
    useRoom();
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [dismissed, setDismissed] = useState(false);

  const isReconnecting = reconnectionStatus === "pending" && !dismissed;

  useEffect(() => {
    if (!isReconnecting) {
      setCountdown(COUNTDOWN_SECONDS);
      return;
    }

    const intervalId = window.setInterval(() => {
      setCountdown((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isReconnecting]);

  useEffect(() => {
    if (reconnectionStatus !== "succeeded" || !room || !isConnected) {
      return;
    }

    const state = room.state as { phase?: string; code?: string };
    const code = state.code || activeRoomCode;
    if (state.phase === "playing") {
      void navigate("/game");
    } else if (code) {
      void navigate(`/lobby/${code}`);
    }
  }, [reconnectionStatus, room, isConnected, activeRoomCode, navigate]);

  const cancel = async () => {
    setDismissed(true);
    localStorage.removeItem("reconnection");
    await disconnect();
  };

  return { isReconnecting, countdown, cancel };
}
