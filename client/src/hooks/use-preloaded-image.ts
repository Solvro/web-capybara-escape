import { useEffect, useState } from "react";

function loadImage(url: string): Promise<void> {
  const image = new Image();
  image.decoding = "async";
  image.src = url;

  if (typeof image.decode === "function") {
    return image.decode().then(
      () => undefined,
      () => undefined,
    );
  }

  return new Promise((resolve) => {
    image.onload = () => resolve();
    image.onerror = () => resolve();
  });
}

export function preloadImages(urls: readonly string[]) {
  for (const url of urls) {
    if (!url) continue;
    void loadImage(url);
  }
}

export function usePreloadImages(urls: readonly string[]) {
  useEffect(() => {
    preloadImages(urls);
  }, [urls]);
}

export function usePreloadedImage(imageUrl?: string) {
  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    let isCancelled = false;

    void loadImage(imageUrl).then(() => {
      if (!isCancelled) setLoadedImageUrl(imageUrl);
    });

    return () => {
      isCancelled = true;
    };
  }, [imageUrl]);

  return !imageUrl || loadedImageUrl === imageUrl;
}
