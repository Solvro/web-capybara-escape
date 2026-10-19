import type { MessageLevelInfo } from "@capybara/shared";
import { ClientMessageType, ServerMessageType } from "@capybara/shared";
import type { Room } from "@colyseus/sdk";
import { useEffect, useState } from "react";

export interface LevelInfoView extends MessageLevelInfo {
  introId: number;
}

export function useLevelInfo(room: Room | null) {
  const [info, setInfo] = useState<LevelInfoView | null>(null);

  useEffect(() => {
    if (room === null) return;

    const unsubscribe = room.onMessage(
      ServerMessageType.LevelInfo,
      (data: MessageLevelInfo) => {
        setInfo((previous) => {
          const isNewIntro =
            data.playIntro &&
            (previous?.playIntro !== true ||
              previous.levelNumber !== data.levelNumber);

          return {
            ...data,
            introId: (previous?.introId ?? 0) + (isNewIntro ? 1 : 0),
          };
        });
      },
    );

    room.send(ClientMessageType.GetLevelInfo);

    return unsubscribe;
  }, [room]);

  return info;
}
