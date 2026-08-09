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
        ...(params?.districtId !== undefined && {
          districtId: params.districtId,
        }),

        ...(params?.provinceId !== undefined && {
          provinceId: params.provinceId,
        }),

        ...(params?.category && {
          category: params.category,
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

getBySlugOrName(slugOrName: string) {
  return prisma.historicalPlace.findFirst({
    where: {
      OR: [
        { slug: slugOrName },
        { name: { equals: slugOrName } },
      ],
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

        timelineJson: data.timelineJson,
        crowd: data.crowd,
        distance: data.distance,
        drivingTime: data.drivingTime,
        walkingTime: data.walkingTime,
        recommendedDeparture: data.recommendedDeparture,
        weather: data.weather,
        temperature: data.temperature,
        photographyTime: data.photographyTime,
        nearbyFuel: data.nearbyFuel,
        nearbyWashrooms: data.nearbyWashrooms,
        nearbyBusStops: data.nearbyBusStops,
        nearbyParking: data.nearbyParking,
        nearbyRailway: data.nearbyRailway,
        emergencyPolice: data.emergencyPolice,
        emergencyAmbulance: data.emergencyAmbulance,
        openingHours: data.openingHours,
        earlyMorningSlot: data.earlyMorningSlot,
        midDaySlot: data.midDaySlot,
        lateAfternoonSlot: data.lateAfternoonSlot,
        visitNote: data.visitNote,
        contactAddress: data.contactAddress,
        contactAdminPhone: data.contactAdminPhone,
        contactEmergencyPhone: data.contactEmergencyPhone,
        contactWebsite: data.contactWebsite,
        contactEmail: data.contactEmail,
        dressCode: data.dressCode,
        photographyRules: data.photographyRules,
        accessibility: data.accessibility,
        dosJson: data.dosJson,
        dontsJson: data.dontsJson,

        seoTitle: data.seoTitle,
        metaDescription: data.metaDescription,
        slug: data.slug,
        focusKeywords: data.focusKeywords,

        galleryImages: {
          create: data.galleryImages,
        },
      },

      include: {
        province: true,
        district: true,
        galleryImages: true,
      },
    });
  },

  async update(id: number, data: any) {
    if (data.galleryImages && Array.isArray(data.galleryImages)) {
      await prisma.placeGalleryImage.deleteMany({
        where: { historicalPlaceId: id },
      });
      if (data.galleryImages.length > 0) {
        await prisma.placeGalleryImage.createMany({
          data: data.galleryImages.map((img: any, idx: number) => ({
            historicalPlaceId: id,
            url: img.url,
            title: img.title || null,
            description: img.description || null,
            position: img.position ?? idx + 1,
          })),
        });
      }
    }

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

        timelineJson: data.timelineJson,
        crowd: data.crowd,
        distance: data.distance,
        drivingTime: data.drivingTime,
        walkingTime: data.walkingTime,
        recommendedDeparture: data.recommendedDeparture,
        weather: data.weather,
        temperature: data.temperature,
        photographyTime: data.photographyTime,
        nearbyFuel: data.nearbyFuel,
        nearbyWashrooms: data.nearbyWashrooms,
        nearbyBusStops: data.nearbyBusStops,
        nearbyParking: data.nearbyParking,
        nearbyRailway: data.nearbyRailway,
        emergencyPolice: data.emergencyPolice,
        emergencyAmbulance: data.emergencyAmbulance,
        openingHours: data.openingHours,
        earlyMorningSlot: data.earlyMorningSlot,
        midDaySlot: data.midDaySlot,
        lateAfternoonSlot: data.lateAfternoonSlot,
        visitNote: data.visitNote,
        contactAddress: data.contactAddress,
        contactAdminPhone: data.contactAdminPhone,
        contactEmergencyPhone: data.contactEmergencyPhone,
        contactWebsite: data.contactWebsite,
        contactEmail: data.contactEmail,
        dressCode: data.dressCode,
        photographyRules: data.photographyRules,
        accessibility: data.accessibility,
        dosJson: data.dosJson,
        dontsJson: data.dontsJson,

        seoTitle: data.seoTitle,
        metaDescription: data.metaDescription,
        slug: data.slug,
        focusKeywords: data.focusKeywords,

        ...(data.image && {
          image: data.image,
        }),
      },

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
