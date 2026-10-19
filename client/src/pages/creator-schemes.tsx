import type { ScreenSequenceDto } from "@capybara/shared";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/api-service";
import { CreatorSchemeDeleteModal } from "../components/creator/creator-schemes/creator-scheme-delete-modal";
import { CreatorSchemesList } from "../components/creator/creator-schemes/creator-schemes-list";
import { ErrorContainer } from "../components/ui/error-container";

function getErrorMessage(error: unknown) {
  if (isAxiosError<{ error?: string }>(error)) {
    return error.response?.data.error ?? error.message;
  }
  return error instanceof Error ? error.message : "Unknown error";
}

export function CreatorSchemes() {
  const [schemes, setSchemes] = useState<ScreenSequenceDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [slugToDelete, setSlugToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const loadSchemes = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      setSchemes(await api.getSchemes());
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSchemes();
  }, [loadSchemes]);

  const handleCloseDeleteModal = () => {
    setSlugToDelete(null);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (slugToDelete === null) return;

    setIsDeleting(true);
    setDeleteError(null);
    try {
      await api.deleteScheme(slugToDelete);
      handleCloseDeleteModal();
      await loadSchemes();
    } catch (error) {
      setDeleteError(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-[2dvw] my-[2dvh] flex w-full max-w-3xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-amber-300">Schemes</h1>
        <Link
          to="/creator"
          className="text-xs text-violet-200 underline hover:text-white"
        >
          Back to creator
        </Link>
      </div>

      {isLoading ? (
        <p className="text-sm text-violet-200">Loading...</p>
      ) : loadError !== null ? (
        <ErrorContainer errorMessage={loadError} />
      ) : (
        <CreatorSchemesList
          schemes={schemes}
          onDelete={(slug) => {
            setSlugToDelete(slug);
          }}
        />
      )}

      <CreatorSchemeDeleteModal
        slug={slugToDelete}
        isDeleting={isDeleting}
        errorMessage={deleteError}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
