import type { QuestionDocument } from "@capybara/shared";

import api from "./api";

const QuestionsApi = {
  async getQuestionById(
    id: string,
    signal?: AbortSignal,
  ): Promise<QuestionDocument> {
    const response = await api.get<{ question: QuestionDocument }>(
      `/api/questions/${encodeURIComponent(id)}`,
      { signal },
    );
    return response.data.question;
  },
};

export default QuestionsApi;
