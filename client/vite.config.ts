import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveAllowedHosts(env: Record<string, string>) {
  const raw = env.VITE_ALLOWED_HOSTS?.trim();
  if (!raw || raw === "true" || raw === "*") {
    return true;
  }
  if (raw === "false") {
    return undefined;
  }
  return raw
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean);
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      host: true,
      port: Number(env.VITE_DEV_PORT || 5173),
      allowedHosts: resolveAllowedHosts(env),
    },
  };
});
