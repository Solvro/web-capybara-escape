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
    <div className="fixed inset-0 z-[60] bg-black/80">
      <div className="absolute top-1/2 left-1/2 flex w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg bg-[#4b2a86] p-6 text-left text-white shadow-lg">
        <h2 className="text-xl text-amber-300">Delete scheme</h2>
        <p className="text-sm">
          Are you sure you want to delete the scheme{" "}
          <span className="text-amber-300">"{slug}"</span>? This cannot be
          undone.
        </p>

        {errorMessage !== null && (
          <p className="text-xs text-red-400">{errorMessage}</p>
        )}

        <div className="mt-2 flex justify-end gap-4">
          <button
            className="h-8 min-w-[70px] rounded-md bg-violet-500 px-3 py-1 text-[0.8rem] font-semibold text-white transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="h-8 min-w-[70px] rounded-md bg-red-500 px-3 py-1 text-[0.8rem] font-semibold text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
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
