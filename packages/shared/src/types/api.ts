import type { FormattedLevel, RoomJson } from "./levels.js";

export type CreateLevelInput = {
  slug: string;
  name: string;
  description?: string;
  data: FormattedLevel;
  isPublished?: boolean;
  createdBy?: string;
};

export type UpdateLevelInput = {
  name?: string;
  description?: string;
  data?: RoomJson;
  updatedBy?: string;
  isPublished?: boolean;
};

export type LevelSummary = {
  slug: string;
  name: string;
  description?: string;
  isPublished: boolean;
  version: number;
  updatedAt?: string | Date;
};

export type ListLevelsOptions = {
  publishedOnly?: boolean;
};

export type ScreenType = "level" | "question";

export type ScreenInput = {
  sequence: number;
  type: ScreenType;
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

export type ScreenSequenceScreen = ScreenInput & { id: string };

export type ScreenSequenceDto = {
  id: string;
  slug: string;
  description?: string;
  screens: ScreenSequenceScreen[];
  createdAt: string;
  updatedAt: string;
};
