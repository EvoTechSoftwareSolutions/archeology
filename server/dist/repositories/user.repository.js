import { prisma } from "../prisma/prisma.js";
export class UserRepository {
    findByEmail(email) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    findById(id) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
    create(data) {
        return prisma.user.create({
            data,
        });
    }
}
