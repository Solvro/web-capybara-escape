import { ClientMessageType } from "@capybara/shared";
import type { Room } from "@colyseus/sdk";
import { useState } from "react";

export function useReadyUp(room: Room | null, canReady: boolean) {
  const [hasReadied, setHasReadied] = useState(false);

  const handlePlay = () => {
    if (!room || !canReady || hasReadied) return;
    setHasReadied(true);
    room.send(ClientMessageType.SetReady, { ready: true });
  };

  return { hasReadied, handlePlay };
}
