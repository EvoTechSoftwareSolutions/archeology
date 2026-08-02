import api from "../lib/axios";

export const categoryApi = {
  getAll: () => {
    return api.get("/categories");
  },

  create: (data: any) => {
    return api.post("/categories", data);
  },

  update: (id: number, data: any) => {
    return api.patch(`/categories/${id}`, data);
  },

  delete: (id: number) => {
    return api.delete(`/categories/${id}`);
  },
};
