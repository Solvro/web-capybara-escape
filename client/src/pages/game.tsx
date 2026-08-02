import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PauseModal } from "@/components/pause-modal";
import { PhaserContainer } from "@/components/phaser-container";
import { Button } from "@/components/ui/button";
import {
  GAME_VIEW_HEIGHT,
  GAME_VIEW_WIDTH,
  MAP_SCALER,
} from "@/constants/global";
import { useRoom } from "@/lib/use-room";
import type { MessagePauseToggled } from "@/types/messages";

export function Game() {
  const { room, isConnected, joinError } = useRoom();
  const [showTimeoutError, setShowTimeoutError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (room !== null && isConnected) {
      return;
    }
    if (joinError) {
      return;
    }

    const timer = setTimeout(() => {
      setShowTimeoutError(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [room, isConnected, joinError]);

  useEffect(() => {
    const handlePauseToggled = (event: Event) => {
      const pauseEvent = event as CustomEvent<MessagePauseToggled>;
      setIsPaused(pauseEvent.detail.isPaused);
    };

    window.addEventListener("game:pauseToggled", handlePauseToggled);

    return () => {
      window.removeEventListener("game:pauseToggled", handlePauseToggled);
    };
  }, []);

  if (joinError || showTimeoutError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div>
          {joinError
            ? "Nie udało się połączyć z grą."
            : "Przekroczono limit czasu połączenia. Serwer może być niedostępny."}
        </div>
        <Button
          disabled={false}
          onClick={async () => {
            await navigate("/");
          }}
        >
          Powrót do menu
        </Button>
      </div>
    );
  }

  if (room === null || !isConnected) {
    return <div>Łączenie z serwerem gry...</div>;
  }

  return (
    <>
      <div
        className="flex items-center justify-center overflow-hidden rounded-2xl bg-violet-950"
        style={{
          width: GAME_VIEW_WIDTH * MAP_SCALER,
          height: GAME_VIEW_HEIGHT * MAP_SCALER,
          // Never let the view spill outside the window; the map stays fully
          // visible because Phaser FIT scales it down to whatever fits.
          maxWidth: "95vw",
          maxHeight: "95vh",
        }}
      >
        <PhaserContainer room={room} />
      </div>

      {isPaused && <PauseModal />}
    </>
  );
}
