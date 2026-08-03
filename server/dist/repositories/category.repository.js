import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const categoryRepository = {
    getAll() {
        return prisma.category.findMany({
            orderBy: {
                name: "asc",
            },
        });
    },
    getById(id) {
        return prisma.category.findUnique({
            where: {
                id,
            },
        });
    },
    getByName(name) {
        return prisma.category.findFirst({
            where: {
                name,
            },
        });
    },
    create(data) {
        return prisma.category.create({
            data,
        });
    },
    update(id, data) {
        return prisma.category.update({
            where: {
                id,
            },
            data,
        });
    },
    delete(id) {
        return prisma.category.delete({
            where: {
                id,
            },
        });
    },
};
