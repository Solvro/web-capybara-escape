import type { Character } from "@capybara/shared";
import type { Room } from "@colyseus/sdk";
import { createContext, useContext } from "react";

export interface CreateRoomParams {
  name: string;
  character: Character;
  code: string;
  screenSequenceSlug?: string;
}

export interface JoinRoomParams {
  name: string;
  character: Character;
  code: string;
}

export type ReconnectionStatus = "idle" | "pending" | "succeeded" | "failed";

interface RoomContextType {
  room: Room | null;
  isConnected: boolean;
  joinError: boolean;
  activeRoomCode: string | null;
  reconnectionStatus: ReconnectionStatus;
  createRoom: (params: CreateRoomParams) => Promise<void>;
  joinRoomByCode: (params: JoinRoomParams) => Promise<void>;
  disconnect: () => Promise<void>;
}

export const RoomContext = createContext<RoomContextType>({
  room: null,
  isConnected: false,
  joinError: false,
  activeRoomCode: null,
  reconnectionStatus: "idle",
  createRoom: async () => {
    /* placeholder */
  },
  joinRoomByCode: async () => {
    /* placeholder */
  },
  disconnect: async () => {
    /* placeholder */
  },
});

export function useRoom() {
  return useContext(RoomContext);
}
