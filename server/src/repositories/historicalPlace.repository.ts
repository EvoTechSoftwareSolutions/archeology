import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const historicalPlaceRepository = {
  getAll(params?: {
    search?: string;
    districtId?: number;
    provinceId?: number;
    category?: string;
    statusFlag?: string;
    page?: number;
    pageSize?: number;
  }) {
    return prisma.historicalPlace.findMany({
      where: {
        ...(params?.districtId && {
          districtId: params.districtId,
        }),

        ...(params?.statusFlag && {
          statusFlag: params.statusFlag,
        }),

        ...(params?.search && {
          OR: [
            {
              name: {
                contains: params.search,
              },
            },
            {
              century: {
                contains: params.search,
              },
            },
            {
              statusFlag: {
                contains: params.search,
              },
            },
            {
              district: {
                name: {
                  contains: params.search,
                },
              },
            },
          ],
        }),
      },

      include: {
        province: true,
        district: true,
        galleryImages: true,
      },
    });
  },

getById(id:number){
 return prisma.historicalPlace.findUnique({
  where:{id},

  include:{
    province:true,
    district:true,
    galleryImages:true,
    siteMonograph:true
  }
 })
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

      data: {
        name: data.name,
        category: data.category,
        description: data.description,
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

        ...(data.image && {
          image: data.image,
        }),
      },

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
