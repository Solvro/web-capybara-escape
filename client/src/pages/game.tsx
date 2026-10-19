import type {
  MessageDemoCompleted,
  MessageGameOver,
  MessageLevelComplete,
  MessagePauseToggled,
} from "@capybara/shared";
import { ClientMessageType } from "@capybara/shared";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AlertModal } from "@/components/alert-modal";
import { GameLoadingScreen } from "@/components/game/game-loading-screen";
import { LevelIntro } from "@/components/game/level-intro";
import { LoadingAnimatorWrapper } from "@/components/loading-animator-wrapper";
import { PauseModal } from "@/components/pause-modal";
import { PhaserContainer } from "@/components/phaser-container";
import { IMAGE_ALERT_PATHS } from "@/constants/global";
import { useLevelInfo } from "@/hooks/game/use-level-info";
import { useRoom } from "@/lib/use-room";

type EndGameState =
  | { kind: "gameOver"; message: string }
  | { kind: "levelComplete"; message: string }
  | { kind: "demoCompleted"; message: string }
  | null;

export function Game() {
  const { room, isConnected, joinError } = useRoom();
  const [showTimeoutError, setShowTimeoutError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [endGame, setEndGame] = useState<EndGameState>(null);
  const [introActive, setIntroActive] = useState(false);
  const levelInfo = useLevelInfo(room);
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

    const unoffDemoCompleted = room.onMessage(
      "demoCompleted",
      (data: MessageDemoCompleted) => {
        setIsPaused(true);
        setEndGame({ kind: "demoCompleted", message: data.message });
      },
    );

    const unoffDemoEnded = room.onMessage("demoEnded", () => {
      localStorage.removeItem("reconnection");
      void navigate("/");
    });

    const unoffReset = room.onMessage("roomReset", () => {
      setIsPaused(false);
      setEndGame(null);
    });

    return () => {
      unoffGameOver();
      unoffLevelComplete();
      unoffDemoCompleted();
      unoffDemoEnded();
      unoffReset();
    };
  }, [room, navigate]);

  const handleRestart = () => {
    if (!room) return;

    setEndGame(null);
    setIsPaused(false);

    if (endGame?.kind === "levelComplete") {
      room.send(ClientMessageType.NextScreen);
    } else {
      room.send(ClientMessageType.Reset);
    }
  };

  const handleEndDemo = () => {
    if (!room) return;

    room.send(ClientMessageType.EndDemo);
  };

  if (joinError || showTimeoutError) {
    return (
      <AlertModal
        title="Błąd połączenia"
        description={
          joinError
            ? "Nie udało się połączyć z grą."
            : "Przekroczono limit czasu połączenia. Serwer może być niedostępny."
        }
        imageUrl={IMAGE_ALERT_PATHS.FAILED_OR_LOST}
        actionText="Powrót do menu"
        onAction={() => void navigate("/")}
      />
    );
  }

  if (room === null || !isConnected || levelInfo === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <GameLoadingScreen />
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingAnimatorWrapper
          levelNumber={levelInfo.levelNumber}
          levelName={levelInfo.levelName}
          initialScene={levelInfo.playIntro ? "blank" : "content"}
        >
          <LevelIntro
            room={room}
            introId={levelInfo.playIntro ? levelInfo.introId : 0}
            onActiveChange={setIntroActive}
          />
          <PhaserContainer room={room} />
        </LoadingAnimatorWrapper>
      </div>

      {isPaused && !introActive && endGame?.kind === "gameOver" && (
        <AlertModal
          title="Porażka"
          description="O K... apibaro, nie udało się uratować! Spróbuj ponownie!"
          imageUrl={IMAGE_ALERT_PATHS.FAILED_OR_LOST}
          actionText="Zagraj od początku"
          onAction={handleRestart}
        />
      )}

      {isPaused && !introActive && endGame?.kind === "levelComplete" && (
        <AlertModal
          title="Capybara uratowana"
          description="Gramy dalej? Czy lecimy do następnego poziomu?!"
          imageUrl={IMAGE_ALERT_PATHS.LEVEL_COMPLETE}
          imageHeight={82}
          actionText="Gramy dalej"
          onAction={handleRestart}
        />
      )}

      {isPaused && !introActive && endGame?.kind === "demoCompleted" && (
        <AlertModal
          title="Ukonczono Demo!"
          description="Co to była za gra? Wpadnij później, aby spróbować jeszcze raz!"
          imageUrl={IMAGE_ALERT_PATHS.LEVEL_COMPLETE}
          imageHeight={68}
          actionText="Powrót do menu"
          onAction={handleEndDemo}
        />
      )}

      {isPaused && !introActive && endGame === null && <PauseModal />}
    </>
  );
}
