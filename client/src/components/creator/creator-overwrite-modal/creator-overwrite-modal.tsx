import { type CreatorExportUploadStatus } from "../creator-export-modal/creator-export-modal";

interface CreatorOverwriteModalProps {
  isOpen: boolean;
  levelName?: string;
  uploadStatus: CreatorExportUploadStatus;
  onClose: () => void;
  onConfirm: () => void;
}

export function CreatorOverwriteModal({
  isOpen,
  levelName,
  uploadStatus,
  onClose,
  onConfirm,
}: CreatorOverwriteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50">
      <div className="absolute left-1/2 top-1/2 flex w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded bg-white p-6 text-black shadow-lg">
        <h2 className="text-xl font-bold text-red-600">
          This level already exists
        </h2>
        <p className="text-sm">
          A level by the name{" "}
          <span className="font-bold">"{levelName || "Untitled Level"}"</span>{" "}
          is already in the database. Do you want to overwrite it?
        </p>

        {uploadStatus === "error" && (
          <p className="text-sm font-semibold text-red-600">
            Error during updating. Check server logs.
          </p>
        )}

        <div className="mt-2 flex justify-end gap-4">
          <button
            className="rounded bg-gray-300 px-4 py-2 font-semibold hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onClose}
            disabled={uploadStatus === "loading"}
          >
            Cancel
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onConfirm}
            disabled={uploadStatus === "loading"}
          >
            {uploadStatus === "loading" ? "Overwriting..." : "Overwrite"}
          </button>
        </div>
      </div>
    </div>
  );
}
