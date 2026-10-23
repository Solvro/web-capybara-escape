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

export interface QuestionDocument {
  id: string;
  question: QuestionNode;
  createdAt: string;
  updatedAt: string;
}
