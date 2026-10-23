import { MONITOR_SCREEN_URL } from "@/constants/global";
import { cn } from "@/lib/utils";

import { MONITOR_ASPECT, MONITOR_VIEWPORT_FILL } from "./constants";
import { CountingLayer } from "./counting-layer";
import { LoadingAnimatorContext } from "./loading-animator-context";
import { TransitionLayer } from "./transition-layer";
import type { LoadingAnimatorWrapperProps } from "./types";
import { useLoadingAnimatorState } from "./use-loading-animator-state";

const FILL_PERCENT = MONITOR_VIEWPORT_FILL * 100;

export function LoadingAnimatorWrapper({
  levelNumber,
  levelName,
  children,
  question,
  initialScene = "content",
}: LoadingAnimatorWrapperProps) {
  const { scene, transition, count, waiting, api, handleCovered, handleDone } =
    useLoadingAnimatorState(initialScene);

  return (
    <LoadingAnimatorContext.Provider value={api}>
      <div
        className="relative"
        style={{
          width: `min(${FILL_PERCENT}vw, calc(${FILL_PERCENT}vh * ${MONITOR_ASPECT}))`,
          aspectRatio: `${MONITOR_ASPECT}`,
          containerType: "inline-size",
        }}
      >
        <img
          src={MONITOR_SCREEN_URL}
          className="absolute inset-0 h-full w-full"
          alt=""
        />

        <div
          className={cn(
            "absolute inset-0 p-[1.5cqw]",
            scene !== "content" && "invisible",
          )}
        >
          {children}
        </div>

        {scene === "question" && (
          <div className="absolute inset-0">{question}</div>
        )}

        {scene === "counting" && (
          <CountingLayer
            count={count}
            levelNumber={levelNumber}
            levelName={levelName}
            waiting={waiting}
          />
        )}

        {transition !== null && (
          <TransitionLayer
            key={transition.id}
            ms={transition.ms}
            onCovered={() => handleCovered(transition)}
            onDone={() => handleDone(transition)}
          />
        )}
      </div>
    </LoadingAnimatorContext.Provider>
  );
}
