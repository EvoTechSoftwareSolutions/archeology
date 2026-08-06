import api from "../lib/axios";

export const dashboardApi = {
  getAll: () => {
    return api.get("/dashboard/stats");
  },

};
