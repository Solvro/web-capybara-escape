import { useState } from "react";

import { Button } from "./ui/button";

interface AlertModalProps {
  title: string;
  description: string;
  imageUrl?: string;
  onClose: () => void;
  closeText?: string;
  onAction?: () => void;
  actionText?: string;
}

export function AlertModal({
  title,
  description,
  imageUrl,
  onClose,
  closeText = "Zamknij",
  onAction,
  actionText,
}: AlertModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleAction = () => {
    setIsOpen(false);
    onAction?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/80">
      <div className="flex flex-col items-center justify-center gap-6 bg-background p-6 rounded-lg max-w-md">
        <div className="arcade-font text-lg text-white">{title}</div>
        {imageUrl && <img src={imageUrl} alt={title} className="w-64 h-64" />}
        <div className="tomorrow-font text-md text-white">{description}</div>
        <Button
          onClick={handleClose}
          disabled={false}
          className="tomorrow-font font-bold text-sm"
        >
          {closeText}
        </Button>
        {onAction && (
          <Button
            onClick={handleAction}
            disabled={false}
            className="tomorrow-font font-bold text-sm"
          >
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
}
