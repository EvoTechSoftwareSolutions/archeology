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
            data,
        });
    },
    update(id, data) {
        return prisma.historicalPlace.update({
            where: {
                id,
            },
            data,
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
