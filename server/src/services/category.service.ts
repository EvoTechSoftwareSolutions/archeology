import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";
import { categoryRepository } from "../repositories/category.repository.js";

const prisma = new PrismaClient();

export const categoryService = {
  async getAllCategories() {
    const categories = await categoryRepository.getAll();

    const counts = await prisma.historicalPlace.groupBy({
      by: ["category"],
      _count: {
        id: true,
      },
    });

    return categories.map((category) => {
      const count = counts.find((group) => group.category === category.name)?._count.id ?? 0;
      return {
        ...category,
        count,
      };
    });
  },

  async createCategory(data: any) {
    const existing = await categoryRepository.getByName(data.name);
    if (existing) {
      throw new ApiError(409, "Category already exists");
    }

    return categoryRepository.create(data);
  },

  async updateCategory(id: number, data: any) {
    const category = await categoryRepository.getById(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    if (data.name && data.name !== category.name) {
      const existing = await categoryRepository.getByName(data.name);
      if (existing) {
        throw new ApiError(409, "Another category with this name already exists");
      }

      await prisma.historicalPlace.updateMany({
        where: {
          category: category.name,
        },
        data: {
          category: data.name,
        },
      });
    }

    return categoryRepository.update(id, data);
  },

  async deleteCategory(id: number) {
    const category = await categoryRepository.getById(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    await prisma.historicalPlace.updateMany({
      where: {
        category: category.name,
      },
      data: {
        category: "Uncategorized",
      },
    });

    return categoryRepository.delete(id);
  },
};
