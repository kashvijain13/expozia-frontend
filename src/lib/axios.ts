// (optional but recommended) src/lib/axios.ts
// so every request automatically sends the token
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "https://expozia-backend.vercel.app/";

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;

});
