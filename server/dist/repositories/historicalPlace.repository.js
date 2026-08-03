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
    getById(id) {
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
    getByName(name) {
        return prisma.historicalPlace.findFirst({
            where: {
                name,
            },
        });
    },
    getByDistrictId(districtId) {
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
    getByDistrictName(districtName) {
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
    create(data) {
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
    update(id, data) {
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
    delete(id) {
        return prisma.historicalPlace.delete({
            where: {
                id,
            },
        });
    },
};
