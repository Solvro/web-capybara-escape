import { Client } from "colyseus.js";
import type { Room } from "colyseus.js";
import React, { useEffect, useState } from "react";

import { RoomContext } from "./use-room";

const client = new Client("ws://localhost:2567");

interface CachedReconnection {
  token: string;
  playerName: string;
}

// Global flag to prevent double reconnection in Strict Mode
let isReconnecting = false;

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [joinError, setJoinError] = useState(false);

  const connect = async (playerName: string) => {
    try {
      const newRoom = await client.joinOrCreate("game_room", {
        name: playerName,
      });
      setRoom(newRoom);
      setIsConnected(true);
      localStorage.setItem(
        "reconnection",
        JSON.stringify({
          token: newRoom.reconnectionToken,
          playerName,
        }),
      );
    } catch (error) {
      console.error("Join error", error);
      setJoinError(true);
      throw error;
    }
  };

  const disconnect = async () => {
    if (room !== null) {
      await room.leave();
      setRoom(null);
      setIsConnected(false);
      localStorage.removeItem("reconnection");
    }
  };

  useEffect(() => {
    const reconnect = async () => {
      if (isReconnecting) {
        return;
      }

      const cached = localStorage.getItem("reconnection");
      if (cached !== null) {
        isReconnecting = true;
        try {
          const parsed = JSON.parse(cached) as CachedReconnection;
          const { token } = parsed;

          const reconnected = await client.reconnect(token);

          setRoom(reconnected);
          setIsConnected(true);

          localStorage.setItem(
            "reconnection",
            JSON.stringify({
              token: reconnected.reconnectionToken,
              playerName: parsed.playerName,
            }),
          );
        } catch (error) {
          console.error("Reconnection failed:", error);
          localStorage.removeItem("reconnection");
        } finally {
          isReconnecting = false;
        }
      }
    };

    void reconnect();
  }, []);

  return (
    <RoomContext.Provider
      value={{ room, isConnected, joinError, connect, disconnect }}
    >
      {children}
    </RoomContext.Provider>
  );
}
