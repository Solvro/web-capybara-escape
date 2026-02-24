import { useEffect, useMemo, useRef, useState } from "react";

import type { WordGuessLetter } from "../../../types/minigames/word-guess/word-guess-letter";
import type { WordGuessWord } from "../../../types/minigames/word-guess/word-guess-word";

export function useWordGuess(word: WordGuessWord) {
  const [letters, setLetters] = useState<WordGuessLetter[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const shouldIncrementMistakes = useRef(false);

  useEffect(() => {
    const newLetters: WordGuessLetter[] = [];

    for (let i = 0; i < word.word.length; i++) {
      newLetters.push({
        letter: word.word[i],
        isCovered: word.initial[i] === "_",
        guess: null,
      });
    }

    setLetters(newLetters);
  }, [word.initial, word.word]);

  useEffect(() => {
    if (shouldIncrementMistakes.current) {
      setMistakes((prev) => prev + 1);
      shouldIncrementMistakes.current = false;
    }
  }, [letters]);

  const shouldDisplayHint = mistakes >= 3;

  const isFailed = mistakes >= 5;

  const isComplete = useMemo(
    () =>
      letters.length > 0 &&
      letters.every(
        (letter) => !letter.isCovered || letter.guess === letter.letter,
      ),
    [letters],
  );

  const setGuess = (guess: string) => {
    if (guess.length == 1) {
      setLetters((prevLetters) => {
        const updatedLetters = [...prevLetters];

        const letterIndex = updatedLetters.findIndex(
          (letter) => letter.isCovered && !letter.guess,
        );

        if (letterIndex === -1) return prevLetters;

        if (guess.toUpperCase() !== updatedLetters[letterIndex].letter) {
          shouldIncrementMistakes.current = true;
        }

        updatedLetters[letterIndex] = {
          ...updatedLetters[letterIndex],
          guess: guess.toUpperCase(),
        };

        return updatedLetters;
      });
    } else if (guess == "Backspace") {
      setLetters((prevLetters) => {
        let lastIndex = -1;

        for (let i = prevLetters.length - 1; i >= 0; i--) {
          const letter = prevLetters[i];
          if (letter.isCovered && letter.guess) {
            lastIndex = i;
            break;
          }
        }

        if (lastIndex === -1) return prevLetters;

        return prevLetters.map((letter, i) =>
          i === lastIndex ? { ...letter, guess: "" } : letter,
        );
      });
    }
  };

  return {
    letters,
    mistakes,
    setGuess,
    isComplete,
    isFailed,
    shouldDisplayHint,
  };
}
