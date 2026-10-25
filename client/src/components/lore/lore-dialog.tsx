import {
  type QuestionNode,
  type QuestionOption,
  formatLoreText,
} from "@capybara/shared";
import { useEffect, useMemo, useState } from "react";

import { monitorMask } from "@/components/loading-animator-wrapper/monitor-mask";
import {
  LORE_DEFAULT_POSE,
  LORE_SPEAKER_NAME,
  LORE_TYPING_DELAY_MS,
} from "@/constants/lore";
import { LORE_BACKGROUNDS, LORE_SPRITES } from "@/constants/lore-sprites";

import { LoreButton } from "./lore-button";
import { LoreCharacter } from "./lore-character";
import { LoreContainer } from "./lore-container";
import { LoreTitle } from "./lore-title";

export interface LoreDialogProps extends QuestionNode {
  onSelect: (option: QuestionOption) => void;
  typingDelay?: number;
  disabled?: boolean;
}

export function LoreDialog(props: LoreDialogProps) {
  return (
    <AnimatedLoreDialog
      key={JSON.stringify([
        props.title,
        props.pose,
        props.options,
        props.typingDelay,
      ])}
      {...props}
    />
  );
}

function AnimatedLoreDialog({
  title,
  options,
  pose = LORE_DEFAULT_POSE,
  disabled = false,
  onSelect,
  typingDelay = LORE_TYPING_DELAY_MS,
}: LoreDialogProps) {
  const characters = useMemo(() => formatLoreText(title), [title]);
  const [visibleCount, setVisibleCount] = useState(0);
  const isComplete = visibleCount >= characters.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCount(characters.length);
      return;
    }

    if (characters.length === 0) return;
    let currentCount = 0;
    let timer: number;

    const advance = () => {
      if (currentCount >= characters.length) return;
      const current = characters[currentCount];
      timer = window.setTimeout(() => {
        currentCount += 1;
        setVisibleCount(currentCount);
        advance();
      }, current.pause || typingDelay);
    };

    advance();
    return () => window.clearTimeout(timer);
  }, [characters, typingDelay]);

  const sprite =
    LORE_SPRITES[pose] ??
    LORE_SPRITES[LORE_DEFAULT_POSE] ??
    Object.values(LORE_SPRITES)[0];

  return (
    <section
      className="@container relative isolate h-full w-full overflow-hidden text-white"
      style={monitorMask}
      aria-label={`Dialog z ${LORE_SPEAKER_NAME}`}
    >
      <img
        src={LORE_BACKGROUNDS.server_room}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <LoreCharacter
        src={sprite.src}
        alt={LORE_SPEAKER_NAME}
        scaleX={sprite.scaleX}
        scaleY={sprite.scaleY}
        offsetX={sprite.offsetX}
        offsetY={sprite.offsetY}
      />

      <div className="absolute bottom-4 left-1/4 z-10 flex w-1/2 flex-col gap-2">
        <LoreTitle>{LORE_SPEAKER_NAME}</LoreTitle>

        <LoreContainer
          glyphs={characters}
          visibleCount={visibleCount}
          onSkip={() => setVisibleCount(characters.length)}
        />

        <div className="grid grid-cols-2 gap-4" aria-label="Odpowiedzi">
          {options.map((option, index) => (
            <LoreButton
              key={index}
              text={option.text}
              isRevealed={isComplete}
              disabled={disabled}
              onClick={() => onSelect(option)}
              className={
                options.length === 1
                  ? "col-span-2 w-1/2 justify-self-center"
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
