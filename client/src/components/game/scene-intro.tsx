import { useEffect } from "react";

import {
  type LoadingScene,
  useLoadingAnimator,
} from "@/components/loading-animator-wrapper";
import { LORE_TRANSITION_MS } from "@/constants/lore";

interface SceneIntroProps {
  scene: LoadingScene;
  introId: number;
}

export function SceneIntro({ scene, introId }: SceneIntroProps) {
  const { displayTransition } = useLoadingAnimator();

  useEffect(() => {
    if (introId === 0) return;

    void displayTransition(LORE_TRANSITION_MS, scene);
  }, [scene, introId, displayTransition]);

  return null;
}
