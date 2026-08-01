import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/button";
import { PauseModal } from "../components/pause-modal";
import {
  GAME_VIEW_HEIGHT,
  GAME_VIEW_WIDTH,
  MAP_SCALER,
} from "../constants/global";
import { useRoom } from "../lib/use-room";
import { PhaserGame } from "../phaser/game";
import type { MessagePauseToggled } from "../types/messages";

export function Game() {
  const { room, isConnected, joinError } = useRoom();
  const [showTimeoutError, setShowTimeoutError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOverText, setGameOverText] = useState<string | null>(null);
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
  useEffect(() => {
    if (!room) return;

    const unoffGameOver = room.onMessage(
      "gameOver",
      (data: { message: string }) => {
        setIsPaused(true);
        setGameOverText(data.message); // "Solvroviczu, Koniec Gry"
      },
    );

    const unoffReset = room.onMessage("roomReset", () => {
      setIsPaused(false);
      setGameOverText(null);
    });

    return () => {
      unoffGameOver();
      unoffReset();
    };
  }, [room]);

  const handleRestart = () => {
    if (room) {
      setGameOverText(null);
      setIsPaused(false);
      room.send("reset");
    }
  };

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
        <PhaserGame room={room} />
      </div>

      {isPaused && (
        <PauseModal
          title={gameOverText ?? "GRA ZATRZYMANA"}
          subtitle={
            gameOverText
              ? "Niestety napotkano przeszkodę!"
              : "Naciśnij P, aby wznowić..."
          }
          onRestart={gameOverText ? handleRestart : undefined}
        />
      )}
    </>
  );
}
