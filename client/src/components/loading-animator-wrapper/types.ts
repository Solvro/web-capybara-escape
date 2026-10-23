import type { ReactNode } from "react";

export type LoadingScene = "blank" | "counting" | "content" | "question";

export interface TransitionState {
  id: number;
  ms: number;
  to?: LoadingScene;
  resolve: () => void;
}

export interface LoadingAnimatorApi {
  displayTransition: (ms: number, to?: LoadingScene) => Promise<void>;
  displayCounting: (seconds: number) => Promise<void>;
  setWaiting: (waiting: boolean) => void;
}

export interface LoadingAnimatorWrapperProps {
  levelNumber: number;
  levelName: string;
  children: ReactNode;
  question?: ReactNode;
  initialScene?: LoadingScene;
}
