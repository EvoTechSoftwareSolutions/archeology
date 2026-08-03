import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const categoryRepository = {
  getAll() {
    return prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },

  getById(id: number) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  },

  getByName(name: string) {
    return prisma.category.findFirst({
      where: {
        name,
      },
    });
  },

  create(data: any) {
    return prisma.category.create({
      data,
    });
  },

  update(id: number, data: any) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  },

  delete(id: number) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  },
};
