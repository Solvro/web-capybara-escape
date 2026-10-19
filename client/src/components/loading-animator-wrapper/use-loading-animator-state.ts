import { useCallback, useMemo, useRef, useState } from "react";

import { COUNT_STEP_MS, DEFAULT_COUNT } from "./constants";
import type {
  LoadingAnimatorApi,
  LoadingScene,
  TransitionState,
} from "./types";

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export function useLoadingAnimatorState(initialScene: LoadingScene) {
  const [scene, setScene] = useState(initialScene);
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const [count, setCount] = useState(DEFAULT_COUNT);
  const sceneRef = useRef(initialScene);
  const transitionRef = useRef<TransitionState | null>(null);
  const transitionId = useRef(0);

  const changeScene = useCallback((next: LoadingScene) => {
    sceneRef.current = next;
    setScene(next);
  }, []);

  const displayTransition = useCallback(
    (ms: number, to?: LoadingScene) =>
      new Promise<void>((resolve) => {
        transitionRef.current?.resolve();

        const next = { id: ++transitionId.current, ms, to, resolve };
        transitionRef.current = next;
        setTransition(next);
      }),
    [],
  );

  const handleCovered = useCallback(
    (burst: TransitionState) => {
      if (burst.to === undefined) return;
      if (burst.to === "counting") setCount(DEFAULT_COUNT);
      changeScene(burst.to);
    },
    [changeScene],
  );

  const handleDone = useCallback((burst: TransitionState) => {
    burst.resolve();
    if (transitionRef.current?.id === burst.id) {
      transitionRef.current = null;
      setTransition(null);
    }
  }, []);

  const displayCounting = useCallback(
    async (seconds: number) => {
      const previous = sceneRef.current;
      changeScene("counting");

      for (let left = seconds; left > 0; left--) {
        setCount(left);
        await sleep(COUNT_STEP_MS);
      }

      if (previous !== "counting") changeScene(previous);
    },
    [changeScene],
  );

  const api = useMemo<LoadingAnimatorApi>(
    () => ({ displayTransition, displayCounting }),
    [displayTransition, displayCounting],
  );

  return { scene, transition, count, api, handleCovered, handleDone };
}
