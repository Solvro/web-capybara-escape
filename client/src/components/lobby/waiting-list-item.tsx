import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface WaitingListItemProps {
  index: number;
  isWaiting?: boolean;
  nickname?: string;
  character: string;
  isClientCharacter: boolean;
  textColor?: string;
  textColorHighlight?: string;
}

const WAITING_SUFFIX = " - Oczekiwanie...";
const TYPE_MS = 90;
const HOLD_MS = 900;
const DELETE_MS = 45;

export function WaitingListItem({
  index,
  isWaiting = false,
  nickname,
  character,
  isClientCharacter,
  textColor = "text-white",
  textColorHighlight = "text-orange-500",
}: WaitingListItemProps) {
  const fullWaitingText = `${character}${WAITING_SUFFIX}`;
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!isWaiting) {
      setTypedText("");
      return;
    }

    let charIndex = 0;
    let deleting = false;
    let timeoutId = 0;

    const tick = () => {
      if (!deleting) {
        charIndex += 1;
        setTypedText(fullWaitingText.slice(0, charIndex));

        if (charIndex >= fullWaitingText.length) {
          deleting = true;
          timeoutId = window.setTimeout(tick, HOLD_MS);
          return;
        }

        timeoutId = window.setTimeout(tick, TYPE_MS);
        return;
      }

      charIndex -= 1;
      setTypedText(fullWaitingText.slice(0, charIndex));

      if (charIndex <= 0) {
        deleting = false;
        timeoutId = window.setTimeout(tick, TYPE_MS);
        return;
      }

      timeoutId = window.setTimeout(tick, DELETE_MS);
    };

    timeoutId = window.setTimeout(tick, TYPE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isWaiting, fullWaitingText]);

  return (
    <p
      className={cn(
        "tomorrow-font mt-2 text-left text-xl",
        isClientCharacter ? textColorHighlight : textColor,
      )}
    >
      {index}.{" "}
      {isWaiting ? (
        <>
          {typedText}
          <span className="animate-pulse">|</span>
        </>
      ) : (
        <>
          {nickname} - {character}
          {isClientCharacter ? " (Twój bohater)" : null}
        </>
      )}
    </p>
  );
}
