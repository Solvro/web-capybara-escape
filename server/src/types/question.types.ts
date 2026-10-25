import type {
  CreateQuestionInput,
  QuestionNode,
  QuestionOption,
  QuestionDocument as SharedQuestionDocument,
  UpdateQuestionInput,
} from "@capybara/shared";

export type QuestionDocument = SharedQuestionDocument<Date>;

export type {
  CreateQuestionInput,
  QuestionNode,
  QuestionOption,
  UpdateQuestionInput,
};
