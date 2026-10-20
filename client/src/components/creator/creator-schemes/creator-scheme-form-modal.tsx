import type {
  CreateScreenSequenceInput,
  LevelSummary,
  ScreenSequenceDto,
} from "@capybara/shared";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { useState } from "react";

import { CustomInput } from "../../ui/custom-input";
import { CustomSelect } from "../../ui/custom-select";

interface CreatorSchemeFormModalProps {
  scheme: ScreenSequenceDto | null;
  levels: LevelSummary[];
  isSaving: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onSave: (input: CreateScreenSequenceInput) => void;
}

export function CreatorSchemeFormModal({
  scheme,
  levels,
  isSaving,
  errorMessage,
  onClose,
  onSave,
}: CreatorSchemeFormModalProps) {
  const [slug, setSlug] = useState(scheme?.slug ?? "");
  const [description, setDescription] = useState(scheme?.description ?? "");
  const [levelSlugs, setLevelSlugs] = useState<string[]>(() =>
    scheme
      ? [...scheme.screens]
          .sort((a, b) => a.sequence - b.sequence)
          .map((screen) => screen.levelSlug ?? "")
      : [""],
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const setLevelAt = (index: number, levelSlug: string) => {
    setLevelSlugs((prev) =>
      prev.map((value, i) => (i === index ? levelSlug : value)),
    );
  };

  const moveLevel = (index: number, offset: -1 | 1) => {
    setLevelSlugs((prev) => {
      const target = index + offset;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const levelOptions = (current: string) => {
    const options = levels.map((level) => ({
      value: level.slug,
      label: level.name,
    }));
    return current !== "" && !levels.some((level) => level.slug === current)
      ? [...options, { value: current, label: current }]
      : options;
  };

  const handleSave = () => {
    if (!slug.trim()) {
      setValidationError("Slug is required.");
      return;
    }
    if (levelSlugs.length === 0) {
      setValidationError("Add at least one screen.");
      return;
    }
    if (levelSlugs.some((levelSlug) => !levelSlug)) {
      setValidationError("Select a level for every screen.");
      return;
    }

    setValidationError(null);
    onSave({
      slug: slug.trim(),
      description: description.trim(),
      screens: levelSlugs.map((levelSlug, index) => ({
        sequence: index + 1,
        type: "level",
        levelSlug,
      })),
    });
  };

  const shownError = validationError ?? errorMessage;

  return (
    <div className="fixed inset-0 z-[60] bg-black/80">
      <div className="absolute top-1/2 left-1/2 flex max-h-[90dvh] w-[480px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-lg bg-[#4b2a86] p-6 text-left text-white shadow-lg">
        <h2 className="text-xl text-amber-300">
          {scheme ? "Edit scheme" : "Add scheme"}
        </h2>

        <CustomInput
          value={slug}
          setValue={setSlug}
          disabled={isSaving}
          placeholder="Slug"
        />
        <CustomInput
          value={description}
          setValue={setDescription}
          disabled={isSaving}
          placeholder="Description"
        />

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-wide text-violet-200 uppercase">
            Screens
          </p>
          {levelSlugs.map((levelSlug, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-6 text-sm text-amber-300">{index + 1}.</span>
              <CustomSelect
                className="min-w-0 flex-1"
                value={levelSlug}
                setValue={(value) => {
                  setLevelAt(index, value);
                }}
                options={levelOptions(levelSlug)}
                placeholder="Select level..."
                disabled={isSaving}
              />
              <button
                className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-500 text-sm text-white transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Move screen up"
                disabled={isSaving || index === 0}
                onClick={() => {
                  moveLevel(index, -1);
                }}
              >
                <ArrowUp className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-500 text-sm text-white transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Move screen down"
                disabled={isSaving || index === levelSlugs.length - 1}
                onClick={() => {
                  moveLevel(index, 1);
                }}
              >
                <ArrowDown className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500 text-sm text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Remove screen"
                disabled={isSaving}
                onClick={() => {
                  setLevelSlugs((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                <X className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              </button>
            </div>
          ))}
          <button
            className="h-8 self-start rounded-md bg-violet-500 px-3 py-1 text-[0.8rem] font-semibold text-white transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSaving}
            onClick={() => {
              setLevelSlugs((prev) => [...prev, ""]);
            }}
          >
            Add screen
          </button>
        </div>

        {shownError !== null && (
          <p className="text-xs text-red-400">{shownError}</p>
        )}

        <div className="mt-2 flex justify-end gap-4">
          <button
            className="h-8 min-w-[70px] rounded-md bg-violet-500 px-3 py-1 text-[0.8rem] font-semibold text-white transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            className="h-8 min-w-[70px] rounded-md bg-emerald-500 px-3 py-1 text-[0.8rem] font-semibold text-white transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
