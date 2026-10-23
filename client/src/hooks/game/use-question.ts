import type { MessageQuestionStart } from "@capybara/shared";
import { ServerMessageType } from "@capybara/shared";
import type { Room } from "@colyseus/sdk";
import { useEffect, useState } from "react";

export interface QuestionView extends MessageQuestionStart {
  introId: number;
}

export function useQuestion(room: Room | null) {
  const [question, setQuestion] = useState<QuestionView | null>(null);

  useEffect(() => {
    if (room === null) return;

    return room.onMessage(
      ServerMessageType.QuestionStart,
      (data: MessageQuestionStart) => {
        setQuestion((previous) => {
          const isSameScreen =
            previous?.screenIndex === data.screenIndex &&
            previous.questionId === data.questionId;

          if (isSameScreen) return previous;

          return { ...data, introId: (previous?.introId ?? 0) + 1 };
        });
      },
    );
  }, [room]);

  return question;
}
