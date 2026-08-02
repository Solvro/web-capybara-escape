import type { CreateLevelInput } from "../types/create-level-input";
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
};

export default ApiService;
