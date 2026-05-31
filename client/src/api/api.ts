import axios from "axios";

const URL = import.meta.env.VITE_PHASER_API;
const api = axios.create({
  method: "post",
  baseURL: URL,
});

export default api;
