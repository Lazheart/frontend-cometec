import axios from 'axios';
import { getToken, isTokenExpired, removeToken } from "@/utils/token";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      if (isTokenExpired(token)) {
        removeToken();
        // Opcional: puedes redirigir al login aquí si tienes acceso a navigate
        throw new Error("Token expirado. Por favor, inicia sesión de nuevo.");
      }
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;