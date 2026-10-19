import type { Character } from "@capybara/shared";
import type { Room } from "@colyseus/sdk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface LobbyPlayerView {
  sessionId: string;
  name: string;
  character: Character;
  ready: boolean;
}

export function useLobbySync(room: Room | null) {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<LobbyPlayerView[]>([]);

  useEffect(() => {
    if (!room) return;

    const syncFromState = (state: unknown) => {
      const typedState = state as {
        phase?: string;
        playerState?: { players?: Map<string, unknown> };
      };

      const rawPlayers = typedState.playerState?.players;
      if (rawPlayers) {
        const list: LobbyPlayerView[] = Array.from(rawPlayers.values()).map(
          (player) => {
            const p = player as {
              sessionId: string;
              name: string;
              character: string;
              ready: boolean;
            };
            return {
              sessionId: p.sessionId,
              name: p.name,
              character: p.character as Character,
              ready: p.ready,
            };
          },
        );
        setPlayers(list);
      }

      if (typedState.phase === "playing") {
        void navigate("/game");
      }
    };

    syncFromState(room.state);
    const maybeUnsubscribe = room.onStateChange(syncFromState) as unknown;

    return () => {
      if (typeof maybeUnsubscribe === "function") {
        maybeUnsubscribe();
      }
    };
  }, [room, navigate]);

  const solPlayer = players.find((player) => player.character === "sol");
  const vronPlayer = players.find((player) => player.character === "vron");
  const bothPresent = !!solPlayer && !!vronPlayer;

  return { players, solPlayer, vronPlayer, bothPresent };
}
