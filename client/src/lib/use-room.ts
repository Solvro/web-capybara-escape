import type { Room } from "colyseus.js";
import { createContext, useContext } from "react";

export interface ConnectOptions {
  playerName: string;
  mode: "join" | "create" | "random";
  roomCode?: string;
  isPrivate?: boolean;
}

interface RoomContextType {
  room: Room | null;
  isConnected: boolean;
  joinError: boolean;
  connect: (options: ConnectOptions) => Promise<void>;
  disconnect: () => Promise<void>;
}

export const RoomContext = createContext<RoomContextType>({
  room: null,
  isConnected: false,
  joinError: false,
  connect: async () => {
    /* placeholder */
  },
  disconnect: async () => {
    /* placeholder */
  },
});

export function useRoom() {
  return useContext(RoomContext);
}
