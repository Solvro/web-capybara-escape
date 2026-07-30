import { MongoServerError } from "mongodb";

import { getMongoDb } from "../db/mongo";
import {
  CreateLevelInput,
  LevelDocument,
  ListLevelsOptions,
  UpdateLevelInput,
} from "./level.types";

const LEVELS_COLLECTION = "levels";

function assertValidSlug(slug: string) {
  if (!slug || !slug.trim()) {
    throw new Error("Level slug is required.");
  }
}

function assertValidName(name: string) {
  if (!name || !name.trim()) {
    throw new Error("Level name is required.");
  }
}
function assertValidData(data: any) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Level data must be a JSON object.");
  }
}

function normalizeCreateInput(input: CreateLevelInput) {
  assertValidSlug(input.slug);
  assertValidName(input.name);
  assertValidData(input.data);

  return {
    ...input,
    slug: input.slug.trim(),
    name: input.name.trim(),
    description: input.description?.trim(),
    isPublished: input.isPublished ?? false,
  };
}

function normalizeUpdateInput(input: UpdateLevelInput) {
  if (input.name !== undefined) {
    assertValidName(input.name);
  }

  if (input.data !== undefined) {
    assertValidData(input.data);
  }

  return {
    ...input,
    name: input.name?.trim(),
    description: input.description?.trim(),
  };
}

export class LevelRepository {
  async ensureIndexes() {
    const db = await getMongoDb();
    if (!db) {
      return;
    }

    const collection = db.collection<LevelDocument>(LEVELS_COLLECTION);

    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ isPublished: 1, updatedAt: -1 });
  }

  async listLevels(options?: ListLevelsOptions) {
    const db = await getMongoDb();
    if (!db) {
      return [] as LevelDocument[];
    }

    const filter = options?.publishedOnly ? { isPublished: true } : {};

    return db
      .collection<LevelDocument>(LEVELS_COLLECTION)
      .find(filter)
      .sort({ updatedAt: -1 })
      .toArray();
  }

  async getBySlug(slug: string, options?: ListLevelsOptions) {
    assertValidSlug(slug);

    const db = await getMongoDb();
    if (!db) {
      return null;
    }

    const normalizedSlug = slug.trim();
    const filter = options?.publishedOnly
      ? { slug: normalizedSlug, isPublished: true }
      : { slug: normalizedSlug };

    return db.collection<LevelDocument>(LEVELS_COLLECTION).findOne(filter);
  }

  async createLevel(input: CreateLevelInput) {
    const db = await getMongoDb();
    if (!db) {
      throw new Error("MongoDB is not configured.");
    }

    const normalized = normalizeCreateInput(input);
    const now = new Date();

    const levelDocument: LevelDocument = {
      slug: normalized.slug,
      name: normalized.name,
      description: normalized.description,
      data: normalized.data,
      isPublished: normalized.isPublished,
      version: 1,
      createdBy: normalized.createdBy,
      updatedBy: normalized.createdBy,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await db
        .collection<LevelDocument>(LEVELS_COLLECTION)
        .insertOne(levelDocument);
      return levelDocument;
    } catch (error: unknown) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new Error(
          `Level with slug '${levelDocument.slug}' already exists.`,
        );
      }

      throw error;
    }
  }

  async updateLevel(slug: string, input: UpdateLevelInput) {
    assertValidSlug(slug);

    const db = await getMongoDb();
    if (!db) {
      throw new Error("MongoDB is not configured.");
    }

    const existing = await this.getBySlug(slug);
    if (!existing) {
      return null;
    }

    const normalized = normalizeUpdateInput(input);

    const updatePayload: Partial<LevelDocument> = {
      updatedAt: new Date(),
    };

    if (normalized.name !== undefined) {
      updatePayload.name = normalized.name;
    }

    if (normalized.description !== undefined) {
      updatePayload.description = normalized.description;
    }

    if (normalized.data !== undefined) {
      updatePayload.data = normalized.data;
      updatePayload.version = (existing.version ?? 1) + 1;
    }

    if (normalized.updatedBy !== undefined) {
      updatePayload.updatedBy = normalized.updatedBy;
    }

    if (normalized.isPublished !== undefined) {
      updatePayload.isPublished = normalized.isPublished;
    }

    await db
      .collection<LevelDocument>(LEVELS_COLLECTION)
      .updateOne({ slug: slug.trim() }, { $set: updatePayload });

    return this.getBySlug(slug);
  }
}

export const levelRepository = new LevelRepository();
