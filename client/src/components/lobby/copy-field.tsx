import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface CopyFieldProps {
  value: string;
  copiedMessage: string;
  className?: string;
}

type CopyStatus = "idle" | "copied" | "error";

async function copyToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "0";
  document.body.append(textarea);
  textarea.select();
  const success = document.execCommand("copy");
  textarea.remove();

  if (!success) {
    throw new Error("Coppy failed");
  }
}

export function CopyField({ value, copiedMessage, className }: CopyFieldProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await copyToClipboard(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setStatus("idle");
    }, 2000);
  };

  const text =
    status === "copied"
      ? copiedMessage
      : status === "error"
        ? "Failed to copy"
        : value;

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      title="Click to copy"
      aria-live="polite"
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 bg-white text-violet-950 rounded-sm text-md tomorrow-font cursor-pointer opacity-80 hover:opacity-100 transition-opacity",
        className,
      )}
    >
      <span className="truncate">{text}</span>
      {status === "copied" ? (
        <Check className="size-4 shrink-0" />
      ) : (
        <Copy className="size-4 shrink-0" />
      )}
    </button>
  );
}
