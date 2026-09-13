import { LevelDocument } from "./level.types";
import { QuestionDocument } from "./question.types";

export type ScreenSequence = {
  id: string;
  slug: string;
  description?: string;
  screens: ScreenDocument[];
  createdAt: Date;
  updatedAt: Date;
};

export type ScreenDocument = {
  id: string;
  sequence: number;
  type: "level" | "question";
  levelSlug?: string;
  questionId?: string;
};

export type ScreenDocumentDetailed = ScreenDocument & {
  level?: LevelDocument;
  question?: QuestionDocument;
};

export type ScreenInput = {
  sequence: number;
  type: "level" | "question";
  levelSlug?: string;
  questionId?: string;
};

export type CreateScreenSequenceInput = {
  slug: string;
  description?: string;
  screens: ScreenInput[];
};

export type UpdateScreenSequenceInput = {
  slug?: string;
  description?: string;
  screens?: ScreenInput[];
};
