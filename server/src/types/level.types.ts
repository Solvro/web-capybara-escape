export type RoomJson = Record<string, unknown>;

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

export type CreateLevelInput = {
  slug: string;
  name: string;
  description?: string;
  data: RoomJson;
  createdBy?: string;
  isPublished?: boolean;
};

export type UpdateLevelInput = {
  name?: string;
  description?: string;
  data?: RoomJson;
  updatedBy?: string;
  isPublished?: boolean;
};

export type ListLevelsOptions = {
  publishedOnly?: boolean;
};
