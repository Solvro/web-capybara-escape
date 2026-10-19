import type { ReactNode } from "react";

import { LORE_TEXT_SIZE } from "@/constants/lore";
import { cn } from "@/lib/utils";

interface LoreTitleProps {
  children: ReactNode;
}

export function LoreTitle({ children }: LoreTitleProps) {
  return (
    <h2
      className={cn(
        "tomorrow-font text-left font-bold text-yellow-400",
        LORE_TEXT_SIZE,
      )}
    >
      {children}
    </h2>
  );
}
