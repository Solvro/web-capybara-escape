import { useMemo, useState } from "react";

import { MinigameContainer } from "../components/minigame-container";
import { BinMinigame } from "../components/minigames/bits/bit-minigame";
import { WordGuessMinigame } from "../components/minigames/word-guess/word-guess-minigame";
import type { Minigame } from "../types/minigames/minigame";

export function Playground() {
  const [currentMinigame, setCurrentMinigame] = useState<Minigame | null>(null);
  const [isMinigameOpen, setIsMinigameOpen] = useState<boolean>(false);
  const [bitCount1, setBitCount1] = useState<number>(0);
  const [bitCount2, setBitCount2] = useState<number>(0);
  const [wordGuessCount, setWordGuessCount] = useState<number>(0);

  const minigames: Minigame[] = useMemo(
    () => [
      {
        name: "bit-1",
        content: (
          <BinMinigame
            completeMinigame={() => {
              setIsMinigameOpen(false);
              setBitCount1((prev) => prev + 1);
              console.log("Bit 1 completed");
            }}
          />
        ),
      },
      {
        name: "bit-2",
        content: (
          <BinMinigame
            completeMinigame={() => {
              setIsMinigameOpen(false);
              setBitCount2((prev) => prev + 1);
              console.log("Bit 2 completed");
            }}
          />
        ),
      },
      {
        name: "word-guess",
        content: (
          <WordGuessMinigame
            completeMinigame={() => {
              setIsMinigameOpen(false);
              setWordGuessCount((prev) => prev + 1);
              console.log("Word guess completed!");
            }}
            failMinigame={() => {
              setIsMinigameOpen(false);
              console.log("Word guess failed!");
            }}
          />
        ),
      },
    ],
    [setCurrentMinigame],
  );

  return (
    <div className="flex flex-col items-center">
      <h1>Welcome in playground</h1>
      <h2>It's place where you can test dev features</h2>

      <p className="mt-12">Count bit 1: {bitCount1}</p>
      <p>Count bit 2: {bitCount2}</p>
      <p>Count word guess: {wordGuessCount}</p>

      <div className="mt-12 flex flex-col gap-4">
        <button
          onClick={() => {
            setCurrentMinigame(
              minigames.find((m) => m.name == "bit-1") ?? null,
            );
            setIsMinigameOpen(true);
          }}
        >
          Open bin minigame 1
        </button>

        <button
          onClick={() => {
            setCurrentMinigame(
              minigames.find((m) => m.name == "bit-2") ?? null,
            );
            setIsMinigameOpen(true);
          }}
        >
          Open bin minigame 2
        </button>

        <button
          onClick={() => {
            setCurrentMinigame(
              minigames.find((m) => m.name == "word-guess") ?? null,
            );
            setIsMinigameOpen(true);
          }}
        >
          Open word guess minigame
        </button>
      </div>
      <MinigameContainer
        isOpen={isMinigameOpen}
        onClose={() => setCurrentMinigame(null)}
        minigame={currentMinigame}
      />
    </div>
  );
}
