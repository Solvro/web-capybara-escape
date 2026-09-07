import type {
  MessageGameOver,
  MessageLevelComplete,
  MessagePauseToggled,
} from "@capybara/shared";
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

type EndGameState =
  | { kind: "gameOver"; message: string }
  | { kind: "levelComplete"; message: string }
  | null;

export function Game() {
  const { room, isConnected, joinError } = useRoom();
  const [showTimeoutError, setShowTimeoutError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [endGame, setEndGame] = useState<EndGameState>(null);
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
      (data: MessageGameOver) => {
        setIsPaused(true);
        setEndGame({ kind: "gameOver", message: data.message });
      },
    );

    const unoffLevelComplete = room.onMessage(
      "levelComplete",
      (data: MessageLevelComplete) => {
        setIsPaused(true);
        setEndGame({ kind: "levelComplete", message: data.message });
      },
    );

    const unoffReset = room.onMessage("roomReset", () => {
      setIsPaused(false);
      setEndGame(null);
    });

    return () => {
      unoffGameOver();
      unoffLevelComplete();
      unoffReset();
    };
  }, [room]);

  const handleRestart = () => {
    if (room) {
      setEndGame(null);
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
        <PhaserContainer room={room} />
      </div>

      {isPaused && (
        <PauseModal
          title={endGame?.message ?? "GRA ZATRZYMANA"}
          subtitle={
            endGame?.kind === "levelComplete"
              ? "Mozesz przejsc do nastepnego poziomu!"
              : endGame?.kind === "gameOver"
                ? "Niestety napotkano przeszkodę!"
                : "Nacisnij P, aby wznowic..."
          }
          actionLabel={
            endGame?.kind === "levelComplete"
              ? "Nastepny poziom"
              : "Zagraj od poczatku"
          }
          onRestart={endGame ? handleRestart : undefined}
        />
      )}
    </>
  );
}
