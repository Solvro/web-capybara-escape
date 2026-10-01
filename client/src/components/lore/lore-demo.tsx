import {
  type LoreAnswer,
  type LoreDialogContent,
  parseLoreDialog,
  stripLoreFormatting,
  validateLoreDialog,
} from "@capybara/shared";
import { useEffect, useState } from "react";

import api from "../../api/api";
import { LoreDialog } from "./lore-dialog";

const yamlFiles = import.meta.glob("../../content/lore/*.ya?ml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const localDialogMap: Record<string, string> = {};
for (const [filePath, content] of Object.entries(yamlFiles)) {
  const match = filePath.match(/\/([^/]+)\.ya?ml$/i);
  if (match) localDialogMap[match[1]] = content;
}

const START_SLUG = Object.hasOwn(localDialogMap, "intro")
  ? "intro"
  : (Object.keys(localDialogMap).sort()[0] ?? "");

export function LoreDemo() {
  const [currentSlug, setCurrentSlug] = useState(START_SLUG);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [replay, setReplay] = useState(0);
  const [remoteDialogs, setRemoteDialogs] = useState<
    Record<string, LoreDialogContent>
  >({});
  const [apiUnavailable, setApiUnavailable] = useState(false);

  useEffect(() => {
    if (!import.meta.env.VITE_PHASER_API || remoteDialogs[currentSlug]) return;

    const controller = new AbortController();
    api
      .get(`/api/lore/${currentSlug}`, { signal: controller.signal })
      .then(({ data }) => {
        if (!controller.signal.aborted) {
          setRemoteDialogs((previous) => ({
            ...previous,
            [currentSlug]: validateLoreDialog(data.dialog),
          }));
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setApiUnavailable(true);
      });

    return () => controller.abort();
  }, [currentSlug, remoteDialogs]);

  let dialog: LoreDialogContent;
  try {
    const localSource = localDialogMap[currentSlug];
    if (remoteDialogs[currentSlug]) {
      dialog = remoteDialogs[currentSlug];
    } else if (localSource) {
      dialog = parseLoreDialog(localSource);
    } else {
      throw new Error(`Nie znaleziono pliku ${currentSlug}.yaml.`);
    }
  } catch (error) {
    return (
      <section className="my-12 w-full max-w-4xl px-4">
        <p role="alert" className="text-red-400">
          Nie udało się wczytać dialogu ({currentSlug}):{" "}
          {error instanceof Error
            ? error.message
            : "Nieprawidłowy format YAML."}
        </p>
      </section>
    );
  }

  const handleAnswer = (_index: number, answer: LoreAnswer) => {
    setLastAction(`Wybrano: „${stripLoreFormatting(answer.text)}”`);
    if (answer.next) setCurrentSlug(answer.next);
  };

  const handleReset = () => {
    setCurrentSlug(START_SLUG);
    setLastAction(null);
    setReplay((value) => value + 1);
  };

  return (
    <section className="my-12 w-full max-w-4xl px-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Podgląd dialogu YAML
          </h2>
          <p className="text-sm text-stone-400">
            Odpowiedzi prowadzą do kolejnych dialogów, a każdy dialog może mieć
            własną pozę.
          </p>
        </div>
        <button
          type="button"
          className="cursor-pointer rounded border border-stone-600 bg-stone-900 px-3 py-1.5 text-sm text-white hover:bg-stone-800"
          onClick={handleReset}
        >
          Od początku
        </button>
      </div>

      {apiUnavailable && (
        <p role="status" className="mb-3 text-xs text-yellow-500/80">
          API niedostępne lub brak połączenia z bazą — używam lokalnych plików
          YAML.
        </p>
      )}

      <LoreDialog
        key={`${currentSlug}-${replay}`}
        {...dialog}
        onAnswer={handleAnswer}
      />

      <p className="mt-3 min-h-6 text-sm text-stone-300" role="status">
        {lastAction ?? ""}
      </p>
    </section>
  );
}
