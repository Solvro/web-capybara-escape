import {
  type LoreAnswer,
  type LoreDialogContent,
  type LoreGlyph,
  formatLoreText,
} from "@capybara/shared";
import { Transition } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";

import solImage from "../../../../images/Sol.png";

export interface LoreDialogProps extends LoreDialogContent {
  onAnswer: (answerIndex: number, answer: LoreAnswer) => void;
  typingDelay?: number;
  poses?: Record<string, string>;
  disabled?: boolean;
}

const COLOR_CLASSES: Record<number, string> = {
  0: "text-white",
  1: "text-blue-400",
  2: "text-red-400",
  3: "text-green-400",
  4: "text-yellow-400",
  5: "text-purple-400",
  6: "text-cyan-400",
  7: "text-stone-400",
};

function renderGlyph(glyph: LoreGlyph, index: number) {
  const colorClass =
    typeof glyph.color === "number"
      ? (COLOR_CLASSES[glyph.color] ?? "text-white")
      : "";
  const style =
    typeof glyph.color === "string" ? { color: glyph.color } : undefined;

  return (
    <span key={index} className={colorClass} style={style}>
      {glyph.text}
    </span>
  );
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
  pose = "neutral",
  poses = {},
  disabled = false,
  onAnswer,
  typingDelay = 30,
}: LoreDialogProps) {
  const characters = useMemo(() => formatLoreText(text), [text]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
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
      timer = window.setTimeout(
        () => {
          currentCount += 1;
          setVisibleCount(currentCount);
          advance();
        },
        current.pause || Math.max(1, typingDelay),
      );
    };

    advance();
    return () => window.clearTimeout(timer);
  }, [characters, typingDelay]);

  return (
    <section
      className="relative isolate w-full overflow-hidden rounded-2xl bg-radial-[ellipse_at_top] from-cyan-900 to-[#090615] to-75% px-4 py-8 font-sans shadow-2xl"
      aria-label="Dialog z Solem"
    >
      <Transition
        appear
        show
        enter="transition-opacity duration-1000 ease-out motion-reduce:transition-none"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div className="relative mx-auto -mb-12 flex flex-col items-center">
          <img
            className="block h-88 w-full max-w-88 object-cover object-[center_15%]"
            src={pose && Object.hasOwn(poses, pose) ? poses[pose] : solImage}
            data-pose={pose}
            alt={`Sol — poza: ${pose}`}
          />
          {pose !== "neutral" && (
            <span className="relative -top-6 rounded-full border border-yellow-500/50 bg-black/70 px-3 py-0.5 text-xs text-yellow-300 backdrop-blur-sm">
              Poza: {pose}
            </span>
          )}
        </div>
      </Transition>

      <div className="relative mx-auto max-w-160">
        <h2 className="mb-2 text-2xl font-bold tracking-wide text-yellow-400">
          Sol
        </h2>
        <div
          className="min-h-36 cursor-pointer rounded-md border-3 border-stone-300 bg-zinc-950 p-5 leading-relaxed whitespace-pre-wrap text-white wrap-anywhere select-none transition-colors hover:border-yellow-400/60"
          aria-busy={!isComplete}
          title={isComplete ? undefined : "Kliknij, aby wyświetlić cały tekst"}
          onClick={() => setVisibleCount(characters.length)}
        >
          <p aria-hidden="true">
            {characters
              .slice(0, visibleCount)
              .map((glyph, index) => renderGlyph(glyph, index))}
          </p>
          <p className="sr-only" aria-live="polite">
            {isComplete ? characters.map((glyph) => glyph.text).join("") : ""}
          </p>
        </div>

        <Transition
          show={isComplete}
          enter="transition-opacity duration-250 ease-out motion-reduce:transition-none"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <div
            className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-3"
            aria-label="Odpowiedzi"
          >
            {answers.map((answer, index) => {
              const answerGlyphs = formatLoreText(answer.text);
              return (
                <button
                  key={index}
                  type="button"
                  className="flex cursor-pointer items-center justify-center rounded-md border-3 border-stone-300 bg-zinc-950 px-4 py-3 text-center leading-snug text-white transition-all enabled:hover:border-yellow-400 enabled:hover:text-yellow-400 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-yellow-400 disabled:cursor-not-allowed disabled:opacity-45 aria-pressed:border-yellow-400 aria-pressed:text-yellow-400"
                  disabled={disabled}
                  aria-pressed={selectedAnswer === index}
                  onClick={() => {
                    setSelectedAnswer(index);
                    onAnswer(index, answer);
                  }}
                >
                  <span>
                    {answerGlyphs.map((glyph, glyphIndex) =>
                      renderGlyph(glyph, glyphIndex),
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </Transition>
      </div>
    </section>
  );
}
