import api from "../lib/axios";

export const authApi = {
  login(data: any) {
    return api.post("/auth/login", data);
  },

  logout() {
    return api.post("/auth/logout");
  },

  me() {
    return api.get("/auth/me");
  },
};
