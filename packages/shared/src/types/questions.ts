export interface QuestionOption {
  text: string;
  endResult?: string;
  nextQuestion?: QuestionNode;
}

export interface QuestionNode {
  title: string;
  pose?: string;
  options: QuestionOption[];
}

export interface QuestionDocument<TDate = string> {
  id: string;
  question: QuestionNode;
  createdAt: TDate;
  updatedAt: TDate;
}

export interface CreateQuestionInput {
  question: QuestionNode;
}

export interface UpdateQuestionInput {
  question?: QuestionNode;
}
