import { AnimatedDots } from "@/components/loading-animator-wrapper/animated-dots";
import {
  MONITOR_ASPECT,
  MONITOR_VIEWPORT_FILL,
} from "@/components/loading-animator-wrapper/constants";
import { monitorMask } from "@/components/loading-animator-wrapper/monitor-mask";
import {
  MONITOR_LOADING_SCREEN_URL,
  MONITOR_SCREEN_URL,
} from "@/constants/global";

const FILL_PERCENT = MONITOR_VIEWPORT_FILL * 100;

interface GameLoadingScreenProps {
  isConnected: boolean;
}

export function GameLoadingScreen({ isConnected }: GameLoadingScreenProps) {
  const monitorStyle = {
    width: `min(${FILL_PERCENT}vw, calc(${FILL_PERCENT}vh * ${MONITOR_ASPECT}))`,
    aspectRatio: `${MONITOR_ASPECT}`,
    containerType: "inline-size",
  } as const;

  if (isConnected) {
    return (
      <div className="relative" style={monitorStyle}>
        <img src={MONITOR_SCREEN_URL} className="h-full w-full" alt="" />
      </div>
    );
  }

  return (
    <div className="relative" style={monitorStyle}>
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

      <p
        className="crt-text absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center font-bold text-white"
        style={{ fontSize: "4cqw", lineHeight: 1.2 }}
      >
        Łączenie z serwerem gry
        <AnimatedDots />
      </p>
    </div>
  );
}
