import type { Room } from "@colyseus/sdk";
import * as Phaser from "phaser";
import { useEffect, useRef } from "react";

import { phaserConfig } from "@/lib/phaser-config";

export interface PhaserContainerProps {
  room: Room;
}

export function PhaserContainer({ room }: PhaserContainerProps) {
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

  return (
    <div id="game-container" ref={containerRef} className="h-full w-full" />
  );
}

PhaserContainer.displayName = "PhaserContainer";
