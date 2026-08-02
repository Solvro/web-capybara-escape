import type { FormattedLevelType } from "./formatted-level";

export type CreateLevelInput = {
  slug: string | undefined;
  name: string | undefined;
  isPublished: boolean;
  data: FormattedLevelType;
};
