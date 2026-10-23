import { useEffect } from "react";

import { useLoadingAnimator } from "@/components/loading-animator-wrapper";
import { LORE_TRANSITION_MS } from "@/constants/lore";

interface QuestionIntroProps {
  introId: number;
}

export function QuestionIntro({ introId }: QuestionIntroProps) {
  const { displayTransition } = useLoadingAnimator();

  useEffect(() => {
    if (introId === 0) return;

    void displayTransition(LORE_TRANSITION_MS, "question");
  }, [introId, displayTransition]);

  return null;
}
