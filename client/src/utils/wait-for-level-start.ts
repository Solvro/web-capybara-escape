import { ServerMessageType } from "@capybara/shared";
import type { Room } from "@colyseus/sdk";

export function listenForLevelStart(room: Room): Promise<void> {
  return new Promise((resolve) => {
    const unsubscribe = room.onMessage(ServerMessageType.LevelStart, () => {
      unsubscribe();
      resolve();
    });
  });
}
