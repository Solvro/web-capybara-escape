import { type LoreDialogContent, validateLoreDialog } from "@capybara/shared";
import type { Db } from "mongodb";

import { getMongoDb } from "../../config/mongo";

interface LoreDocument extends LoreDialogContent {
  _id: string;
}

export class LoreRepository {
  constructor(private readonly getDb: () => Promise<Db | null> = getMongoDb) {}

  private async collection() {
    const db = await this.getDb();
    if (!db) throw new Error("MongoDB is not available.");
    return db.collection<LoreDocument>("lore_dialogs");
  }

  async getBySlug(slug: string) {
    const document = await (await this.collection()).findOne({ _id: slug });
    return document ? validateLoreDialog(document) : null;
  }

  async importDialog(
    slug: string,
    content: LoreDialogContent,
    overwrite = false,
  ) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(
        "Dialog slug must use lowercase letters, numbers and hyphens.",
      );
    }
    const data = validateLoreDialog(content);
    const collection = await this.collection();
    // Mongo's unique _id makes repeated imports safe without a separate index.
    const result = await collection.updateOne(
      { _id: slug },
      overwrite ? { $set: data } : { $setOnInsert: data },
      { upsert: true },
    );
    return result.upsertedCount > 0
      ? "created"
      : overwrite
        ? "updated"
        : "skipped";
  }
}

export const loreRepository = new LoreRepository();
