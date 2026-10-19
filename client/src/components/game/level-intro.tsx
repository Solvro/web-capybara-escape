import { ClientMessageType } from "@capybara/shared";
import type { Room } from "@colyseus/sdk";
import { useEffect } from "react";

import { useLoadingAnimator } from "@/components/loading-animator-wrapper";
import { listenForLevelStart } from "@/utils/wait-for-level-start";

const INTRO_TRANSITION_MS = 700;
const INTRO_COUNT_SECONDS = 3;

interface LevelIntroProps {
  room: Room;
  introId: number;
  onActiveChange: (active: boolean) => void;
}

export function LevelIntro({ room, introId, onActiveChange }: LevelIntroProps) {
  const { displayTransition, displayCounting } = useLoadingAnimator();

  useEffect(() => {
    if (introId === 0) return;

    let cancelled = false;

    const run = async () => {
      onActiveChange(true);

      await displayTransition(INTRO_TRANSITION_MS, "counting");
      if (cancelled) return;
      await displayCounting(INTRO_COUNT_SECONDS);
      if (cancelled) return;
      const started = listenForLevelStart(room);
      room.send(ClientMessageType.LevelReady);
      await started;
      if (cancelled) return;

      await displayTransition(INTRO_TRANSITION_MS, "content");
      if (!cancelled) onActiveChange(false);
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [introId, room, displayTransition, displayCounting, onActiveChange]);

  return null;
}
