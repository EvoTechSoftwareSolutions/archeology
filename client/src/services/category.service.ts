import { categoryApi } from "../api/category.api";

export const categoryService = {
  async getCategories() {
    const response = await categoryApi.getAll();

    return response.data.data;
  },

  async createCategory(data: any) {
    const response = await categoryApi.create(data);

    return response.data;
  },

  async updateCategory(id: number, data: any) {
    const response = await categoryApi.update(id, data);

    return response.data;
  },

  async deleteCategory(id: number) {
    const response = await categoryApi.delete(id);

    return response.data;
  },
};
