import type { CreateLevelInput, LevelSummary } from "@capybara/shared";

import api from "./api";

const ApiService = {
  URL: import.meta.env.VITE_PHASER_API,

  headerWithAuth: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },

  async getLevels(): Promise<LevelSummary[]> {
    const response = await api.get<{ levels: LevelSummary[] }>(
      this.URL + "/api/levels",
      { headers: this.headerWithAuth },
    );
    return response.data.levels;
  },
  async getLevel(slug: string) {
    const response = await api.get(
      this.URL + `/api/levels/${encodeURIComponent(slug)}`,
      { headers: this.headerWithAuth },
    );
    return response.data.level;
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
};

export default ApiService;
