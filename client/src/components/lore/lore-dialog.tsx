import {
  type LoreAnswer,
  type LoreDialogContent,
  formatLoreText,
} from "@capybara/shared";
import { useEffect, useMemo, useState } from "react";

import {
  MONITOR_ASPECT,
  MONITOR_VIEWPORT_FILL,
} from "@/components/loading-animator-wrapper/constants";
import {
  LORE_DEFAULT_POSE,
  LORE_SPEAKER_NAME,
  LORE_TYPING_DELAY_MS,
} from "@/constants/lore";
import { LORE_BACKGROUNDS } from "@/constants/lore-sprites";

import solImage from "../../../../images/Sol.png";
import { LoreButton } from "./lore-button";
import { LoreCharacter } from "./lore-character";
import { LoreContainer } from "./lore-container";
import { LoreTitle } from "./lore-title";

const FILL_PERCENT = MONITOR_VIEWPORT_FILL * 100;

export interface LoreDialogProps extends LoreDialogContent {
  onAnswer: (answerIndex: number, answer: LoreAnswer) => void;
  typingDelay?: number;
  poses?: Record<string, string>;
  disabled?: boolean;
}

export function LoreDialog(props: LoreDialogProps) {
  return (
    <AnimatedLoreDialog
      key={JSON.stringify([
        props.text,
        props.pose,
        props.answers,
        props.typingDelay,
      ])}
      {...props}
    />
  );
}

function AnimatedLoreDialog({
  text,
  answers,
  pose = LORE_DEFAULT_POSE,
  poses = {},
  disabled = false,
  onAnswer,
  typingDelay = LORE_TYPING_DELAY_MS,
}: LoreDialogProps) {
  const characters = useMemo(() => formatLoreText(text), [text]);
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

  const sprite = Object.hasOwn(poses, pose) ? poses[pose] : solImage;

  return (
    <section
      className="@container relative isolate shrink-0 overflow-hidden rounded-2xl text-white shadow-2xl"
      style={{
        width: `min(${FILL_PERCENT}vw, calc(${FILL_PERCENT}vh * ${MONITOR_ASPECT}))`,
        aspectRatio: `${MONITOR_ASPECT}`,
      }}
      aria-label={`Dialog z ${LORE_SPEAKER_NAME}`}
    >
      <img
        src={LORE_BACKGROUNDS.server_room}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <LoreCharacter src={sprite} alt={LORE_SPEAKER_NAME} />

      <div className="absolute bottom-4 left-1/4 z-10 flex w-1/2 flex-col gap-2">
        <LoreTitle>{LORE_SPEAKER_NAME}</LoreTitle>

        <LoreContainer
          glyphs={characters}
          visibleCount={visibleCount}
          onSkip={() => setVisibleCount(characters.length)}
        />

        <div className="flex flex-wrap gap-4" aria-label="Odpowiedzi">
          {answers.map((answer, index) => (
            <LoreButton
              key={index}
              text={answer.text}
              isRevealed={isComplete}
              disabled={disabled}
              onClick={() => onAnswer(index, answer)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
