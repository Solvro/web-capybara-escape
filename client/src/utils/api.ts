import type { CreateLevelInput } from "../types/createLevelInput";

const api = {
  async sendRoom(createLevelInput: CreateLevelInput) {
    try {
      const response = await fetch("http://localhost:2567/api/admin/levels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-user": "admin",
          Authorization: "Bearer giga_dlugi_token",
        },
        body: JSON.stringify(createLevelInput),
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default api;
