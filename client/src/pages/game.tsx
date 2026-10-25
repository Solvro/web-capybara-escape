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
import { DemoEndScreen } from "@/components/game/demo-end-screen";
import { GameLoadingScreen } from "@/components/game/game-loading-screen";
import { LevelIntro } from "@/components/game/level-intro";
import { SceneIntro } from "@/components/game/scene-intro";
import { LoadingAnimatorWrapper } from "@/components/loading-animator-wrapper";
import { QuestionScreen } from "@/components/lore/question-screen";
import { PauseModal } from "@/components/pause-modal";
import { PhaserContainer } from "@/components/phaser-container";
import { IMAGE_ALERT_PATHS } from "@/constants/global";
import { useLevelInfo } from "@/hooks/game/use-level-info";
import { useQuestion } from "@/hooks/game/use-question";
import { useQuestionDocument } from "@/hooks/questions/use-question-document";
import { usePreloadedImage } from "@/hooks/use-preloaded-image";
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
  const question = useQuestion(room);
  const levelInfo = useLevelInfo(room);
  const questionDocument = useQuestionDocument(question?.questionId ?? null);
  const isEndImageReady = usePreloadedImage(IMAGE_ALERT_PATHS.LEVEL_COMPLETE);
  const navigate = useNavigate();

  useEffect(() => {
    if (room !== null && questionDocument.failed) {
      room.send(ClientMessageType.QuestionDone);
    }
  }, [room, questionDocument.failed]);

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

  const handleQuestionFinish = () => {
    if (!room) return;

    room.send(ClientMessageType.QuestionDone);
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
        <GameLoadingScreen isConnected={room !== null && isConnected} />
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
          end={<DemoEndScreen onExit={handleEndDemo} />}
          question={
            question !== null && questionDocument.document !== null ? (
              <QuestionScreen
                key={question.screenIndex}
                root={questionDocument.document.question}
                onFinish={handleQuestionFinish}
              />
            ) : null
          }
        >
          <LevelIntro
            room={room}
            introId={levelInfo.playIntro ? levelInfo.introId : 0}
            onActiveChange={setIntroActive}
          />
          <SceneIntro
            scene="question"
            introId={
              question !== null && questionDocument.document !== null
                ? question.introId
                : 0
            }
          />
          <SceneIntro
            scene="end"
            introId={
              endGame?.kind === "demoCompleted" && isEndImageReady ? 1 : 0
            }
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

      {isPaused && !introActive && endGame === null && <PauseModal />}
    </>
  );
}
