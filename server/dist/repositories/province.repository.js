import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const provinceRepository = {
    getAll() {
        return prisma.province.findMany();
    },
    getById(id) {
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
    getByName(name) {
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
    create(data) {
        return prisma.province.create({
            data,
        });
    },
    update(id, data) {
        return prisma.province.update({
            where: {
                id,
            },
            data,
        });
    },
    delete(id) {
        return prisma.province.delete({
            where: {
                id,
            },
        });
    },
};
