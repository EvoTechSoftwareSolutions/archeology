import api from "../lib/axios";

export const historicalPlaceApi = {
  getAll() {
    return api.get("/historicalPlace");
  },

  getById(id: number | string) {
    return api.get(`/historicalPlace/${id}`);
  },

  create(data: any) {
    return api.post("/historicalPlace", data);
  },

  update(id: number | string, data: any) {
    return api.patch(`/historicalPlace/${id}`, data);
  },

  delete(id: number | string) {
    return api.delete(`/historicalPlace/${id}`);
  },
};