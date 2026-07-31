import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const historicalPlaceRepository = {
  getAll() {
    return prisma.historicalPlace.findMany({
      include: {
        district: {
          include: {
            province: true,
          },
        },
      },
    });
  },

  getById(id: number) {
    return prisma.historicalPlace.findUnique({
      where: {
        id,
      },

      include: {
        district: {
          include: {
            province: true,
          },
        },
      },
    });
  },

  getByName(name: string) {
    return prisma.historicalPlace.findFirst({
      where: {
        name,
      },
    });
  },

  getByDistrictId(districtId: number) {
    return prisma.historicalPlace.findMany({
      where: {
        districtId,
      },

      include: {
        district: {
          include: {
            province: true,
          },
        },
      },
    });
  },

  getByDistrictName(districtName: string) {
    return prisma.historicalPlace.findMany({
      where: {
        district: {
          name: districtName,
        },
      },
      include: {
        district: {
          include: {
            province: true,
          },
        },
      },
    });
  },

  create(data: any) {
    return prisma.historicalPlace.create({
      data,
    });
  },

  update(id: number, data: any) {
    return prisma.historicalPlace.update({
      where: {
        id,
      },

      data,
    });
  },

  delete(id: number) {
    return prisma.historicalPlace.delete({
      where: {
        id,
      },
    });
  },
};
