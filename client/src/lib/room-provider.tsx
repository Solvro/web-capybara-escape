import { Client } from "@colyseus/sdk";
import type { Room } from "@colyseus/sdk";
import React, { useEffect, useState } from "react";

import RoomsApi from "@/api/rooms-api";

import { getColyseusUrl } from "./runtime-config";
import type {
  CreateRoomParams,
  JoinRoomParams,
  ReconnectionStatus,
} from "./use-room";
import { RoomContext } from "./use-room";

const client = new Client(getColyseusUrl());

interface CachedReconnection {
  token: string;
  playerName: string;
  code?: string;
}

// Global flag to prevent double reconnection in Strict Mode
let isReconnecting = false;

function persistReconnection(
  activeRoom: Room,
  playerName: string,
  code: string,
) {
  localStorage.setItem(
    "reconnection",
    JSON.stringify({
      token: activeRoom.reconnectionToken,
      playerName,
      code,
    }),
  );
}

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [joinError, setJoinError] = useState(false);
  const [activeRoomCode, setActiveRoomCode] = useState<string | null>(null);
  const [reconnectionStatus, setReconnectionStatus] =
    useState<ReconnectionStatus>(() =>
      localStorage.getItem("reconnection") === null ? "idle" : "pending",
    );

  const createRoom = async ({
    name,
    character,
    code,
    screenSequenceSlug,
  }: CreateRoomParams) => {
    try {
      const newRoom = await client.create("game_room", {
        name,
        character,
        code,
        ...(screenSequenceSlug ? { screenSequenceSlug } : {}),
      });
      setRoom(newRoom);
      setIsConnected(true);
      setJoinError(false);
      setActiveRoomCode(code);
      persistReconnection(newRoom, name, code);
    } catch (error) {
      console.error("Create room error", error);
      setJoinError(true);
      throw error;
    }
  };

  const joinRoomByCode = async ({ name, character, code }: JoinRoomParams) => {
    try {
      const lookup = await RoomsApi.getRoomByCode(code);
      if (!lookup.exists || !lookup.roomId) {
        throw new Error("Room not found.");
      }
      if (lookup.phase === "playing") {
        throw new Error("Room already in progress.");
      }

      const newRoom = await client.joinById(lookup.roomId, {
        name,
        character,
      });
      setRoom(newRoom);
      setIsConnected(true);
      setJoinError(false);
      setActiveRoomCode(code);
      persistReconnection(newRoom, name, code);
    } catch (error) {
      console.error("Join room error", error);
      setJoinError(true);
      throw error;
    }
  };

  const disconnect = async () => {
    if (room !== null) {
      await room.leave();
      setRoom(null);
      setIsConnected(false);
      setActiveRoomCode(null);
      localStorage.removeItem("reconnection");
      setReconnectionStatus("idle");
    }
  };

  useEffect(() => {
    const reconnect = async () => {
      if (isReconnecting) {
        return;
      }

      const cached = localStorage.getItem("reconnection");
      if (cached === null) {
        setReconnectionStatus("idle");
        return;
      }

      isReconnecting = true;
      setReconnectionStatus("pending");
      try {
        const parsed = JSON.parse(cached) as CachedReconnection;

        const reconnected = await client.reconnect(parsed.token);

        setRoom(reconnected);
        setIsConnected(true);
        setActiveRoomCode(parsed.code ?? null);
        setReconnectionStatus("succeeded");

        localStorage.setItem(
          "reconnection",
          JSON.stringify({
            token: reconnected.reconnectionToken,
            playerName: parsed.playerName,
            code: parsed.code,
          }),
        );
      } catch (error) {
        console.error("Reconnection failed:", error);
        localStorage.removeItem("reconnection");
        setActiveRoomCode(null);
        setReconnectionStatus("failed");
      } finally {
        isReconnecting = false;
      }
    };

    void reconnect();
  }, []);

  return (
    <RoomContext.Provider
      value={{
        room,
        isConnected,
        joinError,
        activeRoomCode,
        reconnectionStatus,
        createRoom,
        joinRoomByCode,
        disconnect,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
