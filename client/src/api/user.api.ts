import api from "../lib/axios";

export const userApi = {
  getUsers() {
    return api.get("/users");
  },

  create(data: any) {
    return api.post("/auth/register", data);
  },

  updateUser(id: number, data: any) {
    return api.put(`/users/${id}`, data);
  },

  deleteUser(id: number) {
    return api.delete(`/users/${id}`);
  },
};