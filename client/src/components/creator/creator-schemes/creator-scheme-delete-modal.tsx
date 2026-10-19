interface CreatorSchemeDeleteModalProps {
  slug: string | null;
  isDeleting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function CreatorSchemeDeleteModal({
  slug,
  isDeleting,
  errorMessage,
  onClose,
  onConfirm,
}: CreatorSchemeDeleteModalProps) {
  if (slug === null) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50">
      <div className="absolute top-1/2 left-1/2 flex w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded bg-white p-6 text-black shadow-lg">
        <h2 className="text-xl font-bold text-red-600">Delete scheme</h2>
        <p className="text-sm">
          Are you sure you want to delete the scheme{" "}
          <span className="font-bold">"{slug}"</span>? This cannot be undone.
        </p>

        {errorMessage !== null && (
          <p className="text-sm font-semibold text-red-600">{errorMessage}</p>
        )}

        <div className="mt-2 flex justify-end gap-4">
          <button
            className="rounded bg-gray-300 px-4 py-2 font-semibold hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
