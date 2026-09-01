import { randomUUID } from "crypto";

import { getMongoDb } from "../../config/mongo";
import {
  CreateQuestionInput,
  QuestionDocument,
  UpdateQuestionInput,
} from "../../types/question.types";

const QUESTIONS_COLLECTION = "questions";

function validateQuestion(question: any): boolean {
  if (!question) return false;

  if (!Array.isArray(question.options)) return false;

  for (const option of question.options) {
    if (!option.text) return false;
    if (!option.endResult && !option.nextQuestion) return false;

    if (option.nextQuestion) {
      if (!validateQuestion(option.nextQuestion)) return false;
    }
  }
  return true;
}

function assertValidData(data: any) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Data must be a JSON object.");
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Data cannot be an empty object.");
  }

  const questions = data.questions || (data.question ? [data.question] : []);

  if (questions.length === 0) {
    throw new Error("JSON must contain at least one question.");
  }

  for (const q of questions) {
    if (!validateQuestion(q)) {
      throw new Error("Invalid question structure.");
    }
  }
}

export class QuestionRepository {
  async ensureIndexes() {
    const db = await getMongoDb();
    if (!db) {
      return;
    }

    const collection = db.collection<QuestionDocument>(QUESTIONS_COLLECTION);
    await collection.createIndex({ id: 1 }, { unique: true });
  }

  async listQuestions() {
    const db = await getMongoDb();
    if (!db) return [];

    return db
      .collection<QuestionDocument>(QUESTIONS_COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
  }

  async getById(id: string) {
    const db = await getMongoDb();
    if (!db) return null;

    return db
      .collection<QuestionDocument>(QUESTIONS_COLLECTION)
      .findOne({ id });
  }

  async createQuestion(input: CreateQuestionInput) {
    const db = await getMongoDb();
    if (!db) throw new Error("MongoDB is not configured.");

    assertValidData(input);

    const now = new Date();
    const newQuestion: QuestionDocument = {
      id: randomUUID(),
      question: input.question,
      createdAt: now,
      updatedAt: now,
    };

    await db
      .collection<QuestionDocument>(QUESTIONS_COLLECTION)
      .insertOne(newQuestion);
    return newQuestion;
  }

  async updateQuestion(id: string, input: UpdateQuestionInput) {
    const db = await getMongoDb();
    if (!db) throw new Error("MongoDB is not configured.");

    const updatePayload: Partial<QuestionDocument> = {
      updatedAt: new Date(),
    };

    if (input.question) {
      assertValidData(input);
      updatePayload.question = input.question;
    }

    await db
      .collection<QuestionDocument>(QUESTIONS_COLLECTION)
      .updateOne({ id }, { $set: updatePayload });

    return this.getById(id);
  }

  async deleteQuestion(id: string) {
    const db = await getMongoDb();
    if (!db) throw new Error("MongoDB is not configured.");

    const result = await db
      .collection<QuestionDocument>(QUESTIONS_COLLECTION)
      .deleteOne({ id });
    return result.deletedCount > 0;
  }
}

export const questionRepository = new QuestionRepository();
