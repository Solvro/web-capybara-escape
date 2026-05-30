import axios from "axios";

import type { CreateLevelInput } from "../types/createLevelInput";

const URL = import.meta.env.VITE_PHASER_API;
const api = axios.create({
  method: "post",
  baseURL: URL,
});

export default api;
