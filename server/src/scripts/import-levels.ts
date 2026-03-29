import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";

import { connectMongo, closeMongoConnection } from "../db/mongo";
import { levelRepository } from "../levels/level.repository";

dotenv.config({ path: ".env.development" });

async function importLevels() {
  const db = await connectMongo();
  if (!db) {
    throw new Error("MongoDB is not configured. Check MONGODB_URI and MONGODB_DB_NAME.");
  }

  await levelRepository.ensureIndexes();

  const examplesDir = path.resolve(process.cwd(), "src/rooms/json/examples");
  const files = await fs.readdir(examplesDir);
  const jsonFiles = files.filter((fileName) => fileName.endsWith(".json"));

  if (jsonFiles.length === 0) {
    console.log("[import-levels] No JSON files found in src/rooms/json/examples.");
    return;
  }

  for (const fileName of jsonFiles) {
    const filePath = path.join(examplesDir, fileName);
    const raw = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(raw);

    const slug = fileName.replace(/\.json$/i, "");
    const existing = await levelRepository.getBySlug(slug);

    if (existing) {
      await levelRepository.updateLevel(slug, {
        name: existing.name || slug,
        description: existing.description,
        data: json,
        updatedBy: "import-script",
        isPublished: true,
      });
      console.log(`[import-levels] Updated: ${slug}`);
      continue;
    }

    await levelRepository.createLevel({
      slug,
      name: slug,
      data: json,
      createdBy: "import-script",
      isPublished: true,
    });

    console.log(`[import-levels] Created: ${slug}`);
  }
}

importLevels()
  .catch((error: unknown) => {
    console.error("[import-levels] Failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeMongoConnection();
  });
