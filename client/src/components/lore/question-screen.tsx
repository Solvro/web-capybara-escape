import type { QuestionNode, QuestionOption } from "@capybara/shared";
import { useState } from "react";

import { LORE_CONTINUE_OPTIONS, LORE_WAITING_TITLE } from "@/constants/lore";

import { LoreDialog } from "./lore-dialog";

interface QuestionScreenProps {
  root: QuestionNode;
  onFinish: () => void;
}

export function QuestionScreen({ root, onFinish }: QuestionScreenProps) {
  const [node, setNode] = useState(root);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (option: QuestionOption) => {
    if (option.nextQuestion) {
      setNode(option.nextQuestion);
      return;
    }

    setIsFinished(true);
    onFinish();
  };

  if (isFinished) {
    return (
      <LoreDialog
        title={LORE_WAITING_TITLE}
        pose={node.pose}
        options={[]}
        onSelect={handleSelect}
      />
    );
  }

  return (
    <LoreDialog
      title={node.title}
      pose={node.pose}
      options={node.options.length > 0 ? node.options : LORE_CONTINUE_OPTIONS}
      onSelect={handleSelect}
    />
  );
}
