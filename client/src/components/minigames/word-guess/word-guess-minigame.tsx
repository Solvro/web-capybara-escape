import { useEffect } from "react";

import { useWordGuess } from "../../../hooks/minigames/word-guess/use-word-guess";
import type { MinigameComponentProps } from "../../../types/minigames/minigame-components-props";
import type { WordGuessWord } from "../../../types/minigames/word-guess/word-guess-word";
import { WordGuessTile } from "./word-guess_tile";

const mockWords: WordGuessWord[] = [
  {
    word: "SOLVRO",
    initial: "SOL__O",
    hintMessage: "How is our student club called?",
  },
];

export function WordGuessMinigame({
  completeMinigame,
  failMinigame,
}: MinigameComponentProps) {
  const {
    letters,
    mistakes,
    setGuess,
    isComplete,
    isFailed,
    shouldDisplayHint,
  } = useWordGuess(mockWords[0]);

  const handleKeyPress = (event: KeyboardEvent) => {
    setGuess(event.key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (isComplete) {
      completeMinigame();
    }
  }, [isComplete]);

  useEffect(() => {
    if (failMinigame !== undefined && isFailed) {
      failMinigame();
    }
  }, [isFailed]);

  return (
    <div className="relative h-full w-full">
      <h3 className="absolute top-1 right-10">Mistakes: {mistakes}/5</h3>
      <div className="flex h-full flex-col items-center justify-center gap-8 text-center">
        <h2 className="text-xl">Guess hidden letters</h2>
        <div className="flex gap-8">
          {letters.map((letter, index) => (
            <WordGuessTile letter={letter} key={index} />
          ))}
        </div>
      </div>
      {shouldDisplayHint && (
        <div className="absolute bottom-2 w-full text-center">
          <h3 className="mt-8">Hint: {mockWords[0].hintMessage}</h3>
        </div>
      )}
    </div>
  );
}
