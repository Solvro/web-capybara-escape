import { Client } from "@colyseus/sdk";
import type { Room } from "@colyseus/sdk";
import React, { useEffect, useState } from "react";

import { RoomContext } from "./use-room";
import type { ConnectOptions } from "./use-room";

const host = window.location.hostname;

const url =
  (import.meta.env.VITE_COLYSEUS_URL as string) || `http://${host}:2567`;
const client = new Client(url);

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

  const connect = async ({
    playerName,
    mode,
    roomCode,
    isPrivate,
  }: ConnectOptions) => {
    try {
      setJoinError(false);
      let joinedRoom: Room;

      if (mode === "create") {
        joinedRoom = await client.create("game_room", {
          name: playerName,
          isPrivate,
        });
      } else if (
        mode === "join" &&
        roomCode !== undefined &&
        roomCode.length > 0
      ) {
        joinedRoom = await client.joinById(roomCode, {
          name: playerName,
        });
      } else {
        joinedRoom = await client.joinOrCreate("game_room", {
          name: playerName,
          isPrivate: false,
        });
      }

      if (joinedRoom && joinedRoom.reconnectionToken) {
        localStorage.setItem(
          "reconnection",
          JSON.stringify({
            token: joinedRoom.reconnectionToken,
            playerName,
          }),
        );
      }

      setRoom(joinedRoom);
      setIsConnected(true);
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
          const { token } = JSON.parse(cached);

          const reconnected = await client.reconnect(token, "game_room");

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
