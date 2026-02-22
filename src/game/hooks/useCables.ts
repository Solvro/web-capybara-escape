import type { Room } from "colyseus.js";
import { useCallback, useEffect, useState } from "react";

import type { CableData } from "../mechanics/Cable";

type CablesMap = Record<string, CableData>;

export function useCables(room: Room | null) {
  const [cables, setCables] = useState<CablesMap>({});

  const applyMapInfo = useCallback((mapInfo: any) => {
    const mapCables: CablesMap = {};
    (mapInfo?.cables || []).forEach((c: any) => {
      mapCables[c.cableId] = {
        cableId: c.cableId,
        x: c.x,
        y: c.y,
        damage: !!c.damage,
        damageDuration: c.damageDuration,
        safeDuration: c.safeDuration,
        timer: c.timer,
      };
    });
    setCables(mapCables);
  }, []);

  const applyCablesUpdate = useCallback((payload: any) => {
    setCables((prev) => {
      const next = { ...prev };
      const list = payload?.cables ?? payload?.toggled ?? payload ?? [];
      list.forEach((t: any) => {
        const id = t.cableId ?? t.id;
        if (!id) return;
        if (!next[id]) {
          next[id] = {
            cableId: id,
            x: t.x ?? 0,
            y: t.y ?? 0,
            damage: !!t.damage,
            damageDuration: t.damageDuration,
            safeDuration: t.safeDuration,
            timer: t.timer,
          };
        } else {
          if (typeof t.damage === "boolean") next[id].damage = t.damage;
          if (typeof t.x === "number") next[id].x = t.x;
          if (typeof t.y === "number") next[id].y = t.y;
          if (typeof t.timer === "number") next[id].timer = t.timer;
        }
      });
      return next;
    });
  }, []);

  useEffect(() => {
    if (!room) return;
    room.onMessage("mapInfo", applyMapInfo);
    room.onMessage("cablesUpdate", applyCablesUpdate);
    room.onMessage("playerDamaged", () => {
      // opcjonalnie: efekt kliencki (np. flash) - tutaj tylko log
      // console.log("playerDamaged", payload);
    });

    // request initial data
    try {
      room.send("getMapInfo");
    } catch (e) {}

    return () => {
      try {
        const maybeRoom = room as Room & {
          offMessage?: (type: string, cb: (...args: any[]) => void) => void;
        };
        maybeRoom.offMessage?.("mapInfo", applyMapInfo);
        maybeRoom.offMessage?.("cablesUpdate", applyCablesUpdate);
      } catch (e) {}
    };
  }, [room, applyMapInfo, applyCablesUpdate]);

  return { cables, setCables };
}
