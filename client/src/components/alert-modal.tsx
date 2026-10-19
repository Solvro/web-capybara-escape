import { useEffect, useState } from "react";

import { Button } from "./ui/button";

interface AlertModalProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  onClose?: () => void;
  closeText?: string;
  onAction?: () => void;
  actionText?: string;
}

export function AlertModal({
  title,
  description,
  imageUrl,
  imageWidth = 64,
  imageHeight = 64,
  onClose,
  closeText = "Zamknij",
  onAction,
  actionText,
}: AlertModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    let isCancelled = false;
    const image = new Image();
    const markAsReady = () => {
      if (!isCancelled) setLoadedImageUrl(imageUrl);
    };

    image.src = imageUrl;

    if (typeof image.decode === "function") {
      image.decode().then(markAsReady).catch(markAsReady);
    } else {
      image.onload = markAsReady;
      image.onerror = markAsReady;
    }

    return () => {
      isCancelled = true;
    };
  }, [imageUrl]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleAction = () => {
    setIsOpen(false);
    onAction?.();
  };

  const isImageReady = !imageUrl || loadedImageUrl === imageUrl;
  if (!isOpen || !isImageReady) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/80">
      <div className="flex flex-col items-center justify-center gap-6 bg-background p-6 rounded-lg max-w-md">
        <div className="arcade-font text-lg text-white">{title}</div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            style={{ width: imageWidth * 4, height: imageHeight * 4 }}
          />
        )}
        <div className="tomorrow-font text-md text-white text-center">
          {description}
        </div>
        {onClose && (
          <Button
            onClick={handleClose}
            disabled={false}
            className="tomorrow-font font-bold text-sm"
          >
            {closeText}
          </Button>
        )}
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
