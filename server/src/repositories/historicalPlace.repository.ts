import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const historicalPlaceRepository = {
  getAll() {
    return prisma.historicalPlace.findMany({
      include: {
        province: true,
        district: true,
        galleryImages: true,
      },
    });
  },

  getById(id: number) {
    return prisma.historicalPlace.findUnique({
      where: {
        id,
      },
      include: {
        province: true,
        district: true,
        galleryImages: true,
        siteMonograph: true,
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
        province: true,
        district: true,
        galleryImages: true,
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
        province: true,
        district: true,
        galleryImages: true,
      },
    });
  },

  create(data: any) {
    return prisma.historicalPlace.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        image: data.image,
        century: data.century,
        statusFlag: data.statusFlag,
        latitude: data.latitude,
        longitude: data.longitude,
        anchorXPct: data.anchorXPct,
        anchorYPct: data.anchorYPct,
        provinceId: data.provinceId,
        districtId: data.districtId,

        nearbyHotels: data.nearbyHotels,
        nearbyHospitals: data.nearbyHospitals,
        nearbyRestaurant: data.nearbyRestaurant,
        travelTips: data.travelTips,

        seoTitle: data.seoTitle,
        metaDescription: data.metaDescription,
        slug: data.slug,
        focusKeywords: data.focusKeywords,

        galleryImages: data.galleryImages ? {
          create: data.galleryImages,
        } : undefined,
      },

      include: {
        province: true,
        district: true,
        galleryImages: true,
      },
    });
  },

  update(id: number, data: any) {
    return prisma.historicalPlace.update({
      where: {
        id,
      },
      data,
      include: {
        province: true,
        district: true,
        galleryImages: true,
      },
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