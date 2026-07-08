import type { CreateLevelInput } from "../types/createLevelInput";
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
  updateRoom: async (slug: string, levelData: CreateLevelInput) => {
    const response = await api.put(`/rooms/${slug}`, levelData);
    return response.data;
  },
};

export default ApiService;
