import type {
  CreateScreenSequenceInput,
  LevelSummary,
  ScreenSequenceDto,
} from "@capybara/shared";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/api-service";
import { CreatorSchemeDeleteModal } from "../components/creator/creator-schemes/creator-scheme-delete-modal";
import { CreatorSchemeFormModal } from "../components/creator/creator-schemes/creator-scheme-form-modal";
import { CreatorSchemesList } from "../components/creator/creator-schemes/creator-schemes-list";

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

  const [levels, setLevels] = useState<LevelSummary[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedScheme, setEditedScheme] = useState<ScreenSequenceDto | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [slugToDelete, setSlugToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const loadSchemes = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const [loadedSchemes, loadedLevels] = await Promise.all([
        api.getSchemes(),
        api.getLevels(),
      ]);
      setSchemes(loadedSchemes);
      setLevels(loadedLevels);
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSchemes();
  }, [loadSchemes]);

  const handleOpenForm = (scheme: ScreenSequenceDto | null) => {
    setEditedScheme(scheme);
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditedScheme(null);
    setFormError(null);
  };

  const handleSave = async (input: CreateScreenSequenceInput) => {
    setIsSaving(true);
    setFormError(null);
    try {
      if (editedScheme) {
        await api.updateScheme(editedScheme.slug, input);
      } else {
        await api.createScheme(input);
      }
      handleCloseForm();
      await loadSchemes();
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

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
        <div className="flex items-center gap-4">
          <button
            className="h-8 min-w-[70px] rounded-md bg-emerald-500 px-3 py-1 text-[0.8rem] font-semibold text-white transition-colors hover:bg-emerald-400"
            onClick={() => {
              handleOpenForm(null);
            }}
          >
            Add scheme
          </button>
          <Link
            to="/creator"
            className="text-xs text-violet-200 underline hover:text-white"
          >
            Back to creator
          </Link>
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-violet-200">Loading...</p>
      ) : loadError !== null ? (
        <p className="text-xs text-red-400">{loadError}</p>
      ) : (
        <CreatorSchemesList
          schemes={schemes}
          onEdit={handleOpenForm}
          onDelete={(slug) => {
            setSlugToDelete(slug);
          }}
        />
      )}

      {isFormOpen && (
        <CreatorSchemeFormModal
          key={editedScheme?.id ?? "new"}
          scheme={editedScheme}
          levels={levels}
          isSaving={isSaving}
          errorMessage={formError}
          onClose={handleCloseForm}
          onSave={handleSave}
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
