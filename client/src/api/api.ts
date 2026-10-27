import axios from "axios";

import { getApiBaseUrl } from "@/lib/runtime-config";

const api = axios.create({
  method: "post",
  baseURL: getApiBaseUrl(),
});

export default api;
