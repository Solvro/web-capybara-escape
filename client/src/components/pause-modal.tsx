import { AlertModal } from "./alert-modal";

interface PauseModalProps {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onRestart?: () => void;
}

export function PauseModal({
  title = "GRA ZATRZYMANA",
  subtitle = "Naciśnij P, aby wznowić...",
  actionLabel = "Zagraj od początku",
  onRestart,
}: PauseModalProps) {
  return (
    <AlertModal
      title={title}
      description={subtitle}
      actionText={actionLabel}
      onAction={onRestart}
    />
  );
}
