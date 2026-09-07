import { randomUUID } from "crypto";

import { getMongoDb } from "../../config/mongo";
import {
  CreateScreenSequenceInput,
  ScreenDocument,
  ScreenDocumentDetailed,
  ScreenInput,
  ScreenSequence,
  UpdateScreenSequenceInput,
} from "../../types/screen-sequence.types";
import { levelRepository } from "../levels/level.repository";
import { questionRepository } from "../questions/question.repository";

const SCREEN_SEQUENCES_COLLECTION = "screen_sequences";

function assertValidSlug(slug: string) {
  if (!slug || !slug.trim()) {
    throw new Error("Screen sequence slug is required.");
  }
}

function assertValidScreenInput(screen: ScreenInput) {
  if (
    typeof screen.sequence !== "number" ||
    !Number.isFinite(screen.sequence)
  ) {
    throw new Error("Each screen must have a numeric sequence.");
  }

  if (screen.type !== "level" && screen.type !== "question") {
    throw new Error('Screen type must be "level" or "question".');
  }

  if (screen.type === "level") {
    if (!screen.levelSlug || !screen.levelSlug.trim()) {
      throw new Error('Screens of type "level" require levelSlug.');
    }
  }

  if (screen.type === "question") {
    if (!screen.questionId || !screen.questionId.trim()) {
      throw new Error('Screens of type "question" require questionId.');
    }
  }
}

function assertValidScreens(screens: ScreenInput[]) {
  if (!Array.isArray(screens) || screens.length === 0) {
    throw new Error("Screens must be a non-empty array.");
  }

  const seenSequences = new Set<number>();

  for (const screen of screens) {
    assertValidScreenInput(screen);

    if (seenSequences.has(screen.sequence)) {
      throw new Error(`Duplicate sequence number: ${screen.sequence}.`);
    }
    seenSequences.add(screen.sequence);
  }
}

async function resolveScreens(
  inputs: ScreenInput[],
): Promise<ScreenDocument[]> {
  assertValidScreens(inputs);

  const resolved: ScreenDocument[] = [];

  for (const input of inputs) {
    if (input.type === "level") {
      const levelSlug = input.levelSlug!.trim();
      const level = await levelRepository.getBySlug(levelSlug);
      if (!level) {
        throw new Error(`Level not found: ${levelSlug}.`);
      }

      resolved.push({
        id: randomUUID(),
        sequence: input.sequence,
        type: "level",
        levelSlug,
      });
      continue;
    }

    const questionId = input.questionId!.trim();
    const question = await questionRepository.getById(questionId);
    if (!question) {
      throw new Error(`Question not found: ${questionId}.`);
    }

    resolved.push({
      id: randomUUID(),
      sequence: input.sequence,
      type: "question",
      questionId,
    });
  }

  return resolved.sort((a, b) => a.sequence - b.sequence);
}

async function hydrateScreen(
  screen: ScreenDocument,
): Promise<ScreenDocumentDetailed> {
  if (screen.type === "level") {
    if (!screen.levelSlug) {
      throw new Error("Screen is missing levelSlug.");
    }
    const level = await levelRepository.getBySlug(screen.levelSlug);
    if (!level) {
      throw new Error(`Level not found: ${screen.levelSlug}.`);
    }
    return { ...screen, level };
  }

  if (!screen.questionId) {
    throw new Error("Screen is missing questionId.");
  }
  const question = await questionRepository.getById(screen.questionId);
  if (!question) {
    throw new Error(`Question not found: ${screen.questionId}.`);
  }
  return { ...screen, question };
}

export class ScreenSequenceRepository {
  async ensureIndexes() {
    const db = await getMongoDb();
    if (!db) {
      return;
    }

    const collection = db.collection<ScreenSequence>(
      SCREEN_SEQUENCES_COLLECTION,
    );
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ id: 1 }, { unique: true });
  }

  async listScreenSequences() {
    const db = await getMongoDb();
    if (!db) return [];

    return db
      .collection<ScreenSequence>(SCREEN_SEQUENCES_COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
  }

  async getBySlug(slug: string) {
    assertValidSlug(slug);

    const db = await getMongoDb();
    if (!db) return null;

    return db
      .collection<ScreenSequence>(SCREEN_SEQUENCES_COLLECTION)
      .findOne({ slug: slug.trim() });
  }

  async getScreenBySequence(slug: string, sequence: number) {
    const plan = await this.getBySlug(slug);
    if (!plan) return { plan: null, screen: null };

    const screen = plan.screens.find((s) => s.sequence === sequence);
    if (!screen) return { plan, screen: null };

    return { plan, screen: await hydrateScreen(screen) };
  }

  async createScreenSequence(input: CreateScreenSequenceInput) {
    const db = await getMongoDb();
    if (!db) throw new Error("MongoDB is not configured.");

    if (!input || typeof input !== "object" || Array.isArray(input)) {
      throw new Error("Data must be a JSON object.");
    }

    assertValidSlug(input.slug);
    const screens = await resolveScreens(input.screens);

    const now = new Date();
    const newSequence: ScreenSequence = {
      id: randomUUID(),
      slug: input.slug.trim(),
      description: input.description?.trim(),
      screens,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await db
        .collection<ScreenSequence>(SCREEN_SEQUENCES_COLLECTION)
        .insertOne(newSequence);
    } catch (error: any) {
      if (error?.code === 11000) {
        throw new Error(
          `Screen sequence with slug "${newSequence.slug}" already exists.`,
        );
      }
      throw error;
    }

    return newSequence;
  }

  async updateScreenSequence(slug: string, input: UpdateScreenSequenceInput) {
    const db = await getMongoDb();
    if (!db) throw new Error("MongoDB is not configured.");

    assertValidSlug(slug);

    if (!input || typeof input !== "object" || Array.isArray(input)) {
      throw new Error("Data must be a JSON object.");
    }

    const existing = await this.getBySlug(slug);
    if (!existing) return null;

    const updatePayload: Partial<ScreenSequence> = {
      updatedAt: new Date(),
    };

    if (input.slug !== undefined) {
      assertValidSlug(input.slug);
      updatePayload.slug = input.slug.trim();
    }

    if (input.description !== undefined) {
      updatePayload.description = input.description.trim();
    }

    if (input.screens !== undefined) {
      updatePayload.screens = await resolveScreens(input.screens);
    }

    try {
      await db
        .collection<ScreenSequence>(SCREEN_SEQUENCES_COLLECTION)
        .updateOne({ slug: slug.trim() }, { $set: updatePayload });
    } catch (error: any) {
      if (error?.code === 11000) {
        throw new Error(
          `Screen sequence with slug "${updatePayload.slug}" already exists.`,
        );
      }
      throw error;
    }

    const lookupSlug = updatePayload.slug ?? slug.trim();
    return this.getBySlug(lookupSlug);
  }
}

export const screenSequenceRepository = new ScreenSequenceRepository();
