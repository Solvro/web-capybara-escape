function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

function readEnvUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimTrailingSlash(trimmed) : null;
}

export function getApiBaseUrl(): string {
  return (
    readEnvUrl(import.meta.env.VITE_PHASER_API) ??
    readEnvUrl(import.meta.env.VITE_API_URL) ??
    ""
  );
}

export function getColyseusUrl(): string {
  return (
    readEnvUrl(import.meta.env.VITE_COLYSEUS_URL) ?? window.location.origin
  );
}

export function getApiToken(): string {
  const token = import.meta.env.VITE_API_TOKEN;
  return typeof token === "string" ? token : "";
}
