import { ClientMessageType } from "@capybara/shared";
import type { Room } from "@colyseus/sdk";

export function useReadyUp(
  room: Room | null,
  canReady: boolean,
  hasReadied: boolean,
) {
  const handlePlay = () => {
    if (!room || !canReady || hasReadied) return;
    room.send(ClientMessageType.SetReady, { ready: true });
  };

  return { handlePlay };
}
