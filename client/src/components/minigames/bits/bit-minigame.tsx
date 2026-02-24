import { useEffect, useRef, useState } from "react";

import type { MinigameComponentProps } from "../../../types/minigames/minigame-components-props";
import { BitTile } from "./bit-tile";

export function BinMinigame({ completeMinigame }: MinigameComponentProps) {
  const [bits, setBits] = useState(Array.from({ length: 8 }, () => 0));

  const switchBit = (index: number) => {
    setBits((prev) => {
      const copy = [...prev];
      copy[index] = copy[index] === 0 ? 1 : 0;
      return copy;
    });
  };

  const correctValue = useRef(Math.floor(Math.random() * 256));

  const correctBits = correctValue.current
    .toString(2)
    .padStart(8, "0")
    .split("")
    .map(Number);

  useEffect(() => {
    const isSame = bits.every((bit, index) => bit === correctBits[index]);

    if (isSame) {
      completeMinigame();
    }
  }, [bits]);

  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="text-2xl">Switch the bits to represent the value</h2>
      <div className="flex gap-4">
        {bits.map((bit, index) => (
          <BitTile bit={bit} switchBit={() => switchBit(index)} />
        ))}
      </div>
      <h3 className="text-lg">Value: {correctValue.current}</h3>
    </div>
  );
}
