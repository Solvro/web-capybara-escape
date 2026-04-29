import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type Plugin, defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function phaserInjectPlugin(): Plugin {
  return {
    name: "phaser-inject",
    enforce: "pre",
    transform(code, id) {
      const norm = id.split(path.sep).join("/");
      if (
        !/\/src\/phaser\//.test(norm) ||
        norm.endsWith("/phaser/runtime.ts")
      ) {
        return null;
      }
      if (!code.includes("Phaser")) {
        return null;
      }
      if (
        /^\s*import\s*\{\s*Phaser\s*\}\s*from\s*["']@\/phaser["']/m.test(code)
      ) {
        return null;
      }
      return `import { Phaser } from "@/phaser";\n${code}`;
    },
  };
}

export default defineConfig({
  plugins: [phaserInjectPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@/phaser": path.resolve(__dirname, "src/phaser/runtime.ts"),
    },
  },
});
