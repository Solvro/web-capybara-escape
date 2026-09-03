import { useState } from "react";

export type DelayConfig = {
  delay?: number;
  activeDuration?: number;
  inactiveDuration?: number;
  damageMs?: number;
  safeMs?: number;
};

interface EntityDelayModalProps {
  isOpen: boolean;
  entityType: "laser" | "cable" | null;
  onSave: (config: DelayConfig) => void;
  onCancel: () => void;
}

export function EntityDelayModal({
  isOpen,
  entityType,
  onSave,
  onCancel,
}: EntityDelayModalProps) {
  const [delay, setDelay] = useState(2000);
  const [activeDuration, setActiveDuration] = useState(2000);
  const [inactiveDuration, setInactiveDuration] = useState(2000);
  const [damageMs, setDamageMs] = useState(3000);
  const [safeMs, setSafeMs] = useState(2000);

  if (!isOpen || !entityType) return null;

  const handleSave = () => {
    if (entityType === "laser") {
      onSave({ delay, activeDuration, inactiveDuration });
    } else if (entityType === "cable") {
      onSave({ delay, damageMs, safeMs });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-black text-center">
        <h2 className="text-xl font-bold mb-4">
          Configuration:
          <br />
          {entityType === "laser" ? "Laser" : "Cable"}
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          <label className="flex flex-col text-sm font-semibold">
            Delay [ms]:
            <input
              type="number"
              className="border-2 border-gray-300 rounded p-1 mt-1 text-center font-normal"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
            />
          </label>

          {entityType === "laser" && (
            <>
              <label className="flex flex-col text-sm font-semibold">
                Active duration [ms]:
                <input
                  type="number"
                  className="border-2 border-gray-300 rounded p-1 mt-1 text-center font-normal"
                  value={activeDuration}
                  onChange={(e) => setActiveDuration(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col text-sm font-semibold">
                Inactive duration [ms]:
                <input
                  type="number"
                  className="border-2 border-gray-300 rounded p-1 mt-1 text-center font-normal"
                  value={inactiveDuration}
                  onChange={(e) => setInactiveDuration(Number(e.target.value))}
                />
              </label>
            </>
          )}

          {entityType === "cable" && (
            <>
              <label className="flex flex-col text-sm font-semibold">
                Damage time (damageMs) [ms]:
                <input
                  type="number"
                  className="border-2 border-gray-300 rounded p-1 mt-1 text-center font-normal"
                  value={damageMs}
                  onChange={(e) => setDamageMs(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col text-sm font-semibold">
                Safe time (safeMs) [ms]:
                <input
                  type="number"
                  className="border-2 border-gray-300 rounded p-1 mt-1 text-center font-normal"
                  value={safeMs}
                  onChange={(e) => setSafeMs(Number(e.target.value))}
                />
              </label>
            </>
          )}
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-black font-bold rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
