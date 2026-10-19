import { useEffect, useState } from "react";

import { TRANSITION_IN_RATIO } from "./constants";
import { monitorMask } from "./monitor-mask";
import { StaticNoise } from "./static-noise";

interface TransitionLayerProps {
  ms: number;
  onCovered: () => void;
  onDone: () => void;
}

export function TransitionLayer({
  ms,
  onCovered,
  onDone,
}: TransitionLayerProps) {
  const [phase, setPhase] = useState<"in" | "out">("in");
  const inMs = ms * TRANSITION_IN_RATIO;
  const outMs = ms - inMs;

  const advance = () => {
    if (phase === "in") {
      setPhase("out");
      onCovered();
    } else {
      onDone();
    }
  };

  useEffect(() => {
    const timer = setTimeout(
      advance,
      (phase === "in" ? inMs : outMs) * 3 + 1000,
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        ...monitorMask,
        opacity: phase === "in" ? 0 : 1,
        animation:
          phase === "in"
            ? `crt-static-in ${inMs}ms linear forwards`
            : `crt-static-out ${outMs}ms linear forwards`,
      }}
      onAnimationEnd={advance}
    >
      <StaticNoise />
    </div>
  );
}
