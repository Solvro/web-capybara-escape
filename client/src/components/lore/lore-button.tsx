import { formatLoreText, stripLoreFormatting } from "@capybara/shared";

import { LORE_TEXT_SIZE } from "@/constants/lore";
import { cn } from "@/lib/utils";

import { LoreText } from "./lore-text";

interface LoreButtonProps {
  text: string;
  isRevealed: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function LoreButton({
  text,
  isRevealed,
  disabled,
  onClick,
}: LoreButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "tomorrow-font relative flex aspect-3/1 basis-2/5 flex-1 items-center justify-center overflow-hidden rounded-sm border-4 border-stone-100 bg-black px-2 text-center leading-snug! text-white transition-colors enabled:cursor-pointer enabled:hover:border-yellow-400 enabled:hover:text-yellow-400 focus-visible:outline-2 focus-visible:outline-yellow-400 disabled:cursor-default",
        disabled && isRevealed && "opacity-50",
        LORE_TEXT_SIZE,
      )}
      aria-label={stripLoreFormatting(text)}
      disabled={disabled || !isRevealed}
      onClick={onClick}
    >
      <span>
        <LoreText glyphs={formatLoreText(text)} />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-black transition-transform duration-500 ease-out motion-reduce:transition-none",
          isRevealed ? "translate-x-full" : "translate-x-0",
        )}
      />
    </button>
  );
}
