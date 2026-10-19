import { ServerMessageType } from "@capybara/shared";
import type { Room } from "@colyseus/sdk";

export function waitForServerMessage(
  room: Room,
  messageType: ServerMessageType,
): Promise<void> {
  return new Promise((resolve) => {
    const unsubscribe = room.onMessage(messageType, () => {
      unsubscribe();
      resolve();
    });
  });
}
