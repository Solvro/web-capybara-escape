import type { FormattedLevelType } from "./formattedLevel";

export type CreateLevelInput = {
  slug: string | undefined;
  name: string | undefined;
  isPublished: boolean;
  data: FormattedLevelType;
};
