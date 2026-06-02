import { randomUUID } from "crypto";

import { getMongoDb } from "../db/mongo";
import {
  CreateQuestionInput,
  QuestionDocument,
  UpdateQuestionInput,
} from "./question.types";

const QUESTIONS_COLLECTION = "questions";

export class QuestionRepository {
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
