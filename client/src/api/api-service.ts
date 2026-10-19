import type {
  CreateLevelInput,
  CreateScreenSequenceInput,
  LevelSummary,
  ScreenSequenceDto,
  UpdateScreenSequenceInput,
} from "@capybara/shared";

import api from "./api";

const ApiService = {
  URL: import.meta.env.VITE_PHASER_API,

  headerWithAuth: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },

  async sendRoom(createLevelInput: CreateLevelInput) {
    return await api
      .post(
        this.URL + "/api/admin/levels",
        {
          slug: createLevelInput.slug,
          name: createLevelInput.name,
          data: createLevelInput.data,
          isPublished: createLevelInput.isPublished,
        },
        { headers: this.headerWithAuth },
      )
      .then((response) => {
        return response;
      });
  },
  async updateRoom(slug: string, levelData: CreateLevelInput) {
    return await api.put(
      this.URL + `/api/admin/levels/${slug}`,
      {
        slug: levelData.slug,
        name: levelData.name,
        data: levelData.data,
        isPublished: levelData.isPublished,
      },
      { headers: this.headerWithAuth },
    );
  },

  async getLevels() {
    const { data } = await api.get<{ levels: LevelSummary[] }>(
      this.URL + "/api/levels",
      { headers: this.headerWithAuth },
    );
    return data.levels;
  },

  async getSchemes() {
    const { data } = await api.get<{ screenSequences: ScreenSequenceDto[] }>(
      this.URL + "/api/screen-sequences",
    );
    return data.screenSequences;
  },
  async createScheme(input: CreateScreenSequenceInput) {
    const { data } = await api.post<{ screenSequence: ScreenSequenceDto }>(
      this.URL + "/api/admin/screen-sequences",
      input,
      { headers: this.headerWithAuth },
    );
    return data.screenSequence;
  },
  async updateScheme(slug: string, input: UpdateScreenSequenceInput) {
    const { data } = await api.put<{ screenSequence: ScreenSequenceDto }>(
      this.URL + `/api/admin/screen-sequences/${encodeURIComponent(slug)}`,
      input,
      { headers: this.headerWithAuth },
    );
    return data.screenSequence;
  },
  async deleteScheme(slug: string) {
    await api.delete(
      this.URL + `/api/admin/screen-sequences/${encodeURIComponent(slug)}`,
      { headers: this.headerWithAuth },
    );
  },
};

export default ApiService;
