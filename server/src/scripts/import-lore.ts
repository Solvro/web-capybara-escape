import { parseLoreDialog } from "@capybara/shared";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";

import { closeMongoConnection } from "../config/mongo";
import { loreRepository } from "../services/lore/lore.repository";

dotenv.config({ path: ".env.development" });

async function importLore() {
  const args = process.argv.slice(2);
  const directory = path.resolve(
    args.find((arg) => !arg.startsWith("--")) ?? "../client/src/content/lore",
  );
  const files = (await fs.readdir(directory))
    .filter((file) => /\.ya?ml$/i.test(file))
    .sort();
  if (files.length === 0) throw new Error("No YAML dialogs found.");

  // Validate every file before writing anything to MongoDB.
  const dialogs = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.ya?ml$/i, "");
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
        throw new Error(`Invalid dialog filename: ${file}`);
      try {
        return {
          slug,
          content: parseLoreDialog(
            await fs.readFile(path.join(directory, file), "utf8"),
          ),
        };
      } catch (error) {
        throw new Error(`Invalid dialog: ${file}`, { cause: error });
      }
    }),
  );
  if (new Set(dialogs.map(({ slug }) => slug)).size !== dialogs.length)
    throw new Error("Duplicate dialog slugs.");
  for (const { slug, content } of dialogs) {
    const status = args.includes("--dry-run")
      ? "validated"
      : await loreRepository.importDialog(
          slug,
          content,
          args.includes("--force"),
        );
    console.log(`[import-lore] ${slug}: ${status}`);
  }
}

importLore()
  .catch((error: unknown) => {
    console.error("[import-lore] Failed:", error);
    process.exitCode = 1;
  })
  .finally(closeMongoConnection);
