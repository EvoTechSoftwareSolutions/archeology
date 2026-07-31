import { prisma } from "../prisma/prisma.js";
export class ContactRepository {
    create(data) {
        return prisma.contactMessage.create({ data });
    }
    findRecent(take = 5) {
        return prisma.contactMessage.findMany({
            take,
            orderBy: { createdAt: "desc" },
        });
    }
    findAll() {
        return prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    findById(id) {
        return prisma.contactMessage.findUnique({
            where: { id },
        });
    }
    update(id, data) {
        return prisma.contactMessage.update({
            where: { id },
            data,
        });
    }
    delete(id) {
        return prisma.contactMessage.delete({
            where: { id },
        });
    }
    countAll() {
        return prisma.contactMessage.count();
    }
    countUnread() {
        return prisma.contactMessage.count({
            where: { status: "unread" },
        });
    }
    findAdminEmails() {
        return prisma.user.findMany({
            where: {
                role: "ADMIN",
                isActive: true,
            },
            select: {
                email: true,
            },
        });
    }
}
