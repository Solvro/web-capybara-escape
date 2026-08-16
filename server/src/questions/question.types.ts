export type QuestionOption = {
  text: string;
  endResult?: string;
  nextQuestion?: QuestionNode;
};

export type QuestionNode = {
  title: string;
  options: QuestionOption[];
};

export type QuestionDocument = {
  id: string;
  question: QuestionNode;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateQuestionInput = {
  question: QuestionNode;
};

export type UpdateQuestionInput = {
  question?: QuestionNode;
};
