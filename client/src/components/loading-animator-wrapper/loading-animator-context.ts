import { createContext, useContext } from "react";

import type { LoadingAnimatorApi } from "./types";

export const LoadingAnimatorContext = createContext<LoadingAnimatorApi | null>(
  null,
);

export function useLoadingAnimator(): LoadingAnimatorApi {
  const api = useContext(LoadingAnimatorContext);
  if (api === null) {
    throw new Error(
      "useLoadingAnimator must be used inside <LoadingAnimatorWrapper>",
    );
  }
  return api;
}
