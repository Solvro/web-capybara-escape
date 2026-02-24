import type { WordGuessLetter } from "../../../types/minigames/word-guess/word-guess-letter";

interface WordGuessTileProps {
  letter: WordGuessLetter;
}

export function WordGuessTile({ letter }: WordGuessTileProps) {
  return (
    <div className="h-16 w-12 text-center text-6xl">
      {letter.isCovered ? (
        letter.guess ? (
          <h2
            className={`${letter.letter === letter.guess ? "text-green-700" : "animate-bounce text-red-600"} `}
          >
            {letter.guess}
          </h2>
        ) : (
          <h2>_</h2>
        )
      ) : (
        letter.letter
      )}
    </div>
  );
}
