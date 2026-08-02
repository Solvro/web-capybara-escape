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
