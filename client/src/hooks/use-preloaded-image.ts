import { useEffect, useState } from "react";

export function usePreloadedImage(imageUrl?: string) {
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

  return !imageUrl || loadedImageUrl === imageUrl;
}
