export type CreatorExportUploadStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

interface CreatorExportModalProps {
  isOpen: boolean;
  formattedLevel: string;
  uploadStatus: CreatorExportUploadStatus;
  onFormattedLevelChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export function CreatorExportModal({
  isOpen,
  formattedLevel,
  uploadStatus,
  onFormattedLevelChange,
  onClose,
  onConfirm,
}: CreatorExportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute left-[2.5%] top-[18%] flex h-[80%] w-[30%] flex-col gap-4 rounded bg-white p-6 text-black shadow-lg">
        <textarea
          className="w-full flex-grow resize-none rounded border border-gray-300 p-2 font-mono text-sm"
          value={formattedLevel}
          onChange={(e) => onFormattedLevelChange(e.target.value)}
          disabled={uploadStatus === "loading"}
        />
        {uploadStatus === "success" && (
          <p className="text-sm font-semibold text-emerald-600">
            Level exported successfully.
          </p>
        )}
        {uploadStatus === "error" && (
          <p className="text-sm font-semibold text-red-600">
            Failed to upload. Check server status
          </p>
        )}
        <div className="flex justify-end gap-4">
          <button
            className="rounded bg-gray-300 px-4 py-2 font-semibold hover:bg-gray-400"
            onClick={onClose}
            disabled={uploadStatus === "loading"}
          >
            {uploadStatus === "success" ? "Close" : "Cancel"}
          </button>
          {uploadStatus !== "success" && (
            <button
              className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={onConfirm}
              disabled={uploadStatus === "loading"}
            >
              {uploadStatus === "loading" ? "Sending..." : "Send"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
