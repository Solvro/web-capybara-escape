import {
  ClientMessageType,
  LEVEL_INTRO_COUNTDOWN_MS,
  ServerMessageType,
} from "@capybara/shared";
import type { Room } from "@colyseus/sdk";
import { useEffect } from "react";

import { useLoadingAnimator } from "@/components/loading-animator-wrapper";
import { waitForServerMessage } from "@/utils/wait-for-level-start";

const INTRO_TRANSITION_MS = 700;
const INTRO_COUNT_SECONDS = LEVEL_INTRO_COUNTDOWN_MS / 1000;

interface LevelIntroProps {
  room: Room;
  introId: number;
  onActiveChange: (active: boolean) => void;
}

export function LevelIntro({ room, introId, onActiveChange }: LevelIntroProps) {
  const { displayTransition, displayCounting, setWaiting } =
    useLoadingAnimator();

  useEffect(() => {
    if (introId === 0) return;

    let cancelled = false;

    const run = async () => {
      onActiveChange(true);
      setWaiting(true);

      await displayTransition(INTRO_TRANSITION_MS, "counting");
      if (cancelled) return;

      const countdown = waitForServerMessage(
        room,
        ServerMessageType.CountdownStart,
      );
      room.send(ClientMessageType.LevelReady);

      await countdown;
      if (cancelled) return;

      setWaiting(false);
      const levelStart = waitForServerMessage(
        room,
        ServerMessageType.LevelStart,
      );
      await displayCounting(INTRO_COUNT_SECONDS);
      if (cancelled) return;

      await levelStart;
      if (cancelled) return;

      await displayTransition(INTRO_TRANSITION_MS, "content");
      if (!cancelled) onActiveChange(false);
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [
    introId,
    room,
    displayTransition,
    displayCounting,
    setWaiting,
    onActiveChange,
  ]);

  return null;
}
