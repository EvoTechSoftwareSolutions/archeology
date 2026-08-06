import api from "../lib/axios";

export const analyticsApi = {
  getAll() {
    return api.get("/analytics");
  },
};