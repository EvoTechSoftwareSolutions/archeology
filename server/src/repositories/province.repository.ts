import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const provinceRepository = {
  getAll() {
    return prisma.province.findMany();
  },

  getById(id: number) {
    return prisma.province.findUnique({
      where: {
        id,
      },

      include: {
        districts: {
          include: {
            historicalPlaces: true,
          },
        },
      },
    });
  },

  getByName(name: string) {
    return prisma.province.findUnique({
      where: {
        name,
      },

      include: {
        districts: {
          include: {
            historicalPlaces: true,
          },
        },
      },
    });
  },

  create(data: any) {
    return prisma.province.create({
      data,
    });
  },

  update(id: number, data: any) {
    return prisma.province.update({
      where: {
        id,
      },

      data,
    });
  },

  delete(id: number) {
    return prisma.province.delete({
      where: {
        id,
      },
    });
  },
};
