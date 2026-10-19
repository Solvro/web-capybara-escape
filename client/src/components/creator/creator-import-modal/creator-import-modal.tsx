import type { LevelSummary } from "@capybara/shared";
import { useEffect, useState } from "react";

import api from "../../../api/api-service";

type FullLevel = Awaited<ReturnType<typeof api.getLevel>>;

interface CreatorImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (level: FullLevel) => void;
}

export function CreatorImportModal({
  isOpen,
  onClose,
  onImport,
}: CreatorImportModalProps) {
  const [levels, setLevels] = useState<LevelSummary[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setStatus("loading");
    api
      .getLevels()
      .then((res) => {
        if (cancelled) return;
        setLevels(res ?? []);
        setStatus("idle");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const handleSelect = async (slug: string) => {
    setStatus("loading");
    try {
      const level = await api.getLevel(slug);
      onImport(level);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute left-[2.5%] top-[18%] flex h-[80%] w-[30%] flex-col gap-4 rounded bg-purple-900 p-6 text-white shadow-lg">
        <h2 className="text-lg font-semibold">Import level</h2>

        <ul className="flex grow flex-col gap-2 overflow-y-auto rounded border border-gray-300 p-2">
          {status === "idle" && levels.length === 0 && (
            <li className="text-sm text-gray-500">No levels found.</li>
          )}
          {levels.map((level) => (
            <li key={level.slug}>
              <button
                className="w-full rounded bg-purple-600 px-3 py-2 text-left hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => handleSelect(level.slug)}
                disabled={status === "loading"}
              >
                <span className="font-semibold">{level.name}</span>
                {!level.isPublished && (
                  <span className="ml-2 text-sm text-gray-500">(draft)</span>
                )}
                {level.description && (
                  <p className="text-sm text-gray-600">{level.description}</p>
                )}
              </button>
            </li>
          ))}
        </ul>

        {status === "loading" && (
          <p className="text-sm font-semibold text-gray-600">Loading...</p>
        )}
        {status === "error" && (
          <p className="text-sm font-semibold text-red-600">
            Failed to load levels. Check server status
          </p>
        )}

        <div className="flex justify-end gap-4">
          <button
            className="rounded bg-purple-600 px-4 py-2 font-semibold hover:bg-purple-500"
            onClick={onClose}
            disabled={status === "loading"}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
