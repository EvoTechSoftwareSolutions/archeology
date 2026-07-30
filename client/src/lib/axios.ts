import axios from "axios";

/**
 * If your app already has an axios instance with auth wired up
 * (e.g. src/lib/api.ts or src/services/axiosInstance.ts), delete this
 * file and import that one instead in historicalPlace.service.ts —
 * you don't want two separate instances with different auth handling.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Adjust to whatever your app does on session expiry
      // (redirect to login, clear token, etc.)
    }
    return Promise.reject(error);
  }
);

export default api;
