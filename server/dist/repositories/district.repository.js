import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const districtRepository = {
    getAll() {
        return prisma.district.findMany({
            include: {
                province: true,
                historicalPlaces: true,
            },
        });
    },
    getById(id) {
        return prisma.district.findUnique({
            where: {
                id,
            },
            include: {
                historicalPlaces: true,
                province: true,
            }
        });
    },
    getByName(name) {
        return prisma.district.findFirst({
            where: {
                name,
            },
        });
    },
    create(data) {
        return prisma.district.create({
            data,
        });
    },
    update(id, data) {
        return prisma.district.update({
            where: {
                id,
            },
            data,
        });
    },
    delete(id) {
        return prisma.district.delete({
            where: {
                id,
            },
        });
    }
};
