import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const historicalPlaceRepository = {
<<<<<<< HEAD
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
=======
getAll() {
  return prisma.historicalPlace.findMany({
    include: {

      province: true,

      district: true,

      galleryImages: true,

    },
  });
},
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c

  getById(id: number) {
    return prisma.historicalPlace.findUnique({
      where: {
        id,
      },
      include: {
<<<<<<< HEAD
        district: {
          include: {
            province: true,
          },
        },
=======
        district: true,
        galleryImages: true,
        siteMonograph: true,
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
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
<<<<<<< HEAD
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
=======
        district: true,
        galleryImages: true,
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
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

      galleryImages: {
        create: data.galleryImages,
      },
    },

    include: {
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