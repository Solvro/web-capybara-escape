import type { RoomJson } from "@capybara/shared";

export type LevelDocument = {
  slug: string;
  name: string;
  description?: string;
  data: RoomJson;
  isPublished: boolean;
  version: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
};
