import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // FastAPI backend URL
  timeout: 8000,
});

export const predictSpam = (text) =>
  api.post("/api/predict", { text }).then((res) => res.data);

export const getInfo = () =>
  api.get("/info").then((res) => res.data);

export default api;
