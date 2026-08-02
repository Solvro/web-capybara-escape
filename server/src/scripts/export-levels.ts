import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";

import { closeMongoConnection, connectMongo } from "../config/mongo";
import { levelRepository } from "../services/levels/level.repository";

dotenv.config({ path: ".env.development" });

const FORCE = process.argv.includes("--force");
const SKIP_SLUGS = new Set(["default"]);

async function exportLevels() {
  const db = await connectMongo();
  if (!db) {
    throw new Error(
      "MongoDB is not configured. Check MONGODB_URI and MONGODB_DB_NAME.",
    );
  }

  await levelRepository.ensureIndexes();

  const examplesDir = path.resolve(process.cwd(), "src/rooms/json/examples");
  const files = await fs.readdir(examplesDir);
  const jsonFiles = files.filter((fileName) => fileName.endsWith(".json"));

  if (jsonFiles.length === 0) {
    console.log(
      "[export-levels] No JSON files found in src/rooms/json/examples.",
    );
    return;
  }

  for (const fileName of jsonFiles) {
    const slug = fileName.replace(/\.json$/i, "");

    if (SKIP_SLUGS.has(slug)) {
      console.log(`[export-levels] Skipped: ${slug} (reserved fallback file)`);
      continue;
    }

    const filePath = path.join(examplesDir, fileName);
    const raw = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(raw);

    const existing = await levelRepository.getBySlug(slug);

    if (existing) {
      if (!FORCE) {
        console.log(
          `[export-levels] Skipped: ${slug} (already exists — use --force to overwrite)`,
        );
        continue;
      }

      await levelRepository.updateLevel(slug, {
        name: existing.name || slug,
        description: existing.description,
        data: json,
        updatedBy: "export-script",
        isPublished: true,
      });
      console.log(`[export-levels] Updated: ${slug}`);
      continue;
    }

    await levelRepository.createLevel({
      slug,
      name: slug,
      data: json,
      createdBy: "export-script",
      isPublished: true,
    });

    console.log(`[export-levels] Created: ${slug}`);
  }
}

exportLevels()
  .catch((error: unknown) => {
    console.error("[export-levels] Failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeMongoConnection();
  });
