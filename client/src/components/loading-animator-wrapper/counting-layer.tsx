import { MONITOR_LOADING_SCREEN_URL } from "@/constants/global";

import { AnimatedDots } from "./animated-dots";
import { monitorMask } from "./monitor-mask";

interface CountingLayerProps {
  count: number;
  levelNumber: number;
  levelName: string;
  waiting?: boolean;
}

export function CountingLayer({
  count,
  levelNumber,
  levelName,
  waiting = false,
}: CountingLayerProps) {
  return (
    <div className="absolute inset-0">
      <img
        src={MONITOR_LOADING_SCREEN_URL}
        className="h-full w-full crt-blur"
        alt=""
      />

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={monitorMask}
      >
        <div className="crt-scanlines absolute inset-0" />
        <div className="crt-roll-bar absolute inset-x-0" />
      </div>

      {waiting ? (
        <p
          className="crt-text absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center font-bold text-white"
          style={{ fontSize: "4cqw", lineHeight: 1.2 }}
        >
          Oczekiwanie na drugiego gracza
          <AnimatedDots />
        </p>
      ) : (
        <p
          className="crt-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white"
          style={{ fontSize: "12cqw", lineHeight: 1 }}
        >
          {count}
        </p>
      )}
      <p
        className="crt-text absolute font-bold text-gray-300"
        style={{
          right: "4cqw",
          bottom: "5cqw",
          fontSize: "2.2cqw",
          lineHeight: 1,
        }}
      >
        Level {levelNumber}: {levelName}
        <AnimatedDots />
      </p>
    </div>
  );
}
