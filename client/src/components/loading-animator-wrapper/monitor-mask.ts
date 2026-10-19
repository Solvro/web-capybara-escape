import type { CSSProperties } from "react";

import { MONITOR_LOADING_SCREEN_URL } from "@/constants/global";

export const monitorMask: CSSProperties = {
  WebkitMaskImage: `url(${MONITOR_LOADING_SCREEN_URL})`,
  maskImage: `url(${MONITOR_LOADING_SCREEN_URL})`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};
