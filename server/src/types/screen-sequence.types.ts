import type { ScreenType } from "@capybara/shared";

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
  type: ScreenType;
  levelSlug?: string;
  questionId?: string;
};

export type ScreenDocumentDetailed = ScreenDocument & {
  level?: LevelDocument;
  question?: QuestionDocument;
};

export type {
  ScreenInput,
  CreateScreenSequenceInput,
  UpdateScreenSequenceInput,
} from "@capybara/shared";
