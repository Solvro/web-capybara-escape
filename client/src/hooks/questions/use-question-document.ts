import type { QuestionDocument } from "@capybara/shared";
import { useEffect, useState } from "react";

import QuestionsApi from "@/api/questions-api";

interface LoadedQuestion {
  id: string;
  document: QuestionDocument;
}

export function useQuestionDocument(questionId: string | null) {
  const [loaded, setLoaded] = useState<LoadedQuestion | null>(null);
  const [failedId, setFailedId] = useState<string | null>(null);

  useEffect(() => {
    if (questionId === null) return;

    const controller = new AbortController();

    QuestionsApi.getQuestionById(questionId, controller.signal)
      .then((document) => setLoaded({ id: questionId, document }))
      .catch(() => {
        if (!controller.signal.aborted) setFailedId(questionId);
      });

    return () => controller.abort();
  }, [questionId]);

  return {
    document: loaded?.id === questionId ? loaded.document : null,
    failed: questionId !== null && failedId === questionId,
  };
}
