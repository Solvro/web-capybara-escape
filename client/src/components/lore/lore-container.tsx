import type { LoreGlyph } from "@capybara/shared";

import { LORE_TEXT_SIZE } from "@/constants/lore";
import { cn } from "@/lib/utils";

import { LoreText } from "./lore-text";

interface LoreContainerProps {
  glyphs: LoreGlyph[];
  visibleCount: number;
  onSkip: () => void;
}

export function LoreContainer({
  glyphs,
  visibleCount,
  onSkip,
}: LoreContainerProps) {
  const isComplete = visibleCount >= glyphs.length;

  return (
    <div
      className={cn(
        "tomorrow-font aspect-3/1 w-full cursor-pointer overflow-hidden rounded-sm border-4 border-stone-100 bg-black p-4 text-left leading-snug! whitespace-pre-wrap text-white wrap-anywhere select-none",
        LORE_TEXT_SIZE,
      )}
      aria-busy={!isComplete}
      onClick={onSkip}
    >
      <p aria-hidden="true">
        <LoreText glyphs={glyphs.slice(0, visibleCount)} />
      </p>
      <p className="sr-only" aria-live="polite">
        {isComplete ? glyphs.map((glyph) => glyph.text).join("") : ""}
      </p>
    </div>
  );
}
