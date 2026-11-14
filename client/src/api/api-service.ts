import type { CreateLevelInput, LevelSummary } from "@capybara/shared";

import { getApiToken } from "@/lib/runtime-config";

import api from "./api";

const ApiService = {
  headerWithAuth: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getApiToken()}`,
  },

  async getLevels(): Promise<LevelSummary[]> {
    const response = await api.get<{ levels: LevelSummary[] }>("/api/levels", {
      headers: this.headerWithAuth,
    });
    return response.data.levels;
  },
  async getLevel(slug: string) {
    const response = await api.get(`/api/levels/${encodeURIComponent(slug)}`, {
      headers: this.headerWithAuth,
    });
    return response.data.level;
  },

  async sendRoom(createLevelInput: CreateLevelInput) {
    return await api.post(
      "/api/admin/levels",
      {
        slug: createLevelInput.slug,
        name: createLevelInput.name,
        data: createLevelInput.data,
        isPublished: createLevelInput.isPublished,
      },
      { headers: this.headerWithAuth },
    );
  },
  async updateRoom(slug: string, levelData: CreateLevelInput) {
    return await api.put(
      `/api/admin/levels/${slug}`,
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
