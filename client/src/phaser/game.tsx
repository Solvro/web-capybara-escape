import type { Room } from "@colyseus/sdk";
import { useEffect, useRef } from "react";

import { phaserConfig } from "./config";
import { STOPWATCH_EVENT } from "./ui/stopwatch";

export interface PhaserGameProps {
  room: Room;
  onTimeChange?: (display: string) => void;
}

export function PhaserGame({ room, onTimeChange }: PhaserGameProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onTimeChangeRef = useRef(onTimeChange);
  onTimeChangeRef.current = onTimeChange;

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      ...phaserConfig,
      parent: containerRef.current ?? phaserConfig.parent,
      callbacks: {
        preBoot: (game) => {
          game.registry.set("room", room);
        },
      },
    };

    const instance = new Phaser.Game(config);
    gameRef.current = instance;

    const handleTime = (display: string) => {
      onTimeChangeRef.current?.(display);
    };
    instance.events.on(STOPWATCH_EVENT, handleTime);

    return () => {
      instance.events.off(STOPWATCH_EVENT, handleTime);
      instance.destroy(true);
      gameRef.current = null;
    };
  }, [room]);

  return <div id="game-container" ref={containerRef}></div>;
}

PhaserGame.displayName = "PhaserGame";
