import { useState } from "react";

import { LoadingAnimatorWrapper } from "@/components/loading-animator-wrapper";
import { Button } from "@/components/ui/button";
import { LORE_DEFAULT_QUESTION_ID } from "@/constants/lore";
import { useQuestionDocument } from "@/hooks/questions/use-question-document";

import { QuestionScreen } from "./question-screen";

export function LoreDemo() {
  const [replay, setReplay] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { document, failed } = useQuestionDocument(LORE_DEFAULT_QUESTION_ID);

  const handleReplay = () => {
    setIsFinished(false);
    setReplay((value) => value + 1);
  };

  return (
    <section className="my-12 flex w-full flex-col items-center gap-4">
      <h2 className="text-2xl font-bold tracking-tight text-white">
        Podgląd dialogu
      </h2>

      <Button
        disabled={false}
        onClick={handleReplay}
        className="tomorrow-font text-sm font-bold"
      >
        Od początku
      </Button>

      {failed && (
        <p role="alert" className="text-red-400">
          Nie udało się pobrać dialogu {LORE_DEFAULT_QUESTION_ID} z API.
        </p>
      )}

      {document && (
        <LoadingAnimatorWrapper
          levelNumber={0}
          levelName=""
          initialScene="question"
          question={
            <QuestionScreen
              key={replay}
              root={document.question}
              onFinish={() => setIsFinished(true)}
            />
          }
        >
          {null}
        </LoadingAnimatorWrapper>
      )}

      <p role="status" className="min-h-6 text-sm text-stone-300">
        {isFinished ? "Dialog zakończony." : ""}
      </p>
    </section>
  );
}
