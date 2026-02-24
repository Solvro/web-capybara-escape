import type { Room } from "colyseus.js";
import { useEffect, useRef } from "react";

import { phaserConfig } from "./config";

export interface PhaserGameProps {
  room: Room;
}

export function PhaserGame({ room }: PhaserGameProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

    return () => {
      instance.destroy(true);
      gameRef.current = null;
    };
  }, [room]);

  return <div id="game-container" ref={containerRef}></div>;
}

PhaserGame.displayName = "PhaserGame";
