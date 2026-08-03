import api from "../lib/axios";

export const provinceApi = {
  getAll() {
    return api.get("/provinces");
  },

  getById(id: number | string) {
    return api.get(`/provinces/${id}`);
  },
};