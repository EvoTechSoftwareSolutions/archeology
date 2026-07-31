import { prisma } from "../prisma/prisma.js";
export class NewsletterRepository {
    findByEmail(email) {
        return prisma.newsletterSubscriber.findUnique({
            where: { email },
        });
    }
    create(data) {
        return prisma.newsletterSubscriber.create({
            data,
        });
    }
    update(id, data) {
        return prisma.newsletterSubscriber.update({
            where: { id },
            data,
        });
    }
    findAll() {
        return prisma.newsletterSubscriber.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    findById(id) {
        return prisma.newsletterSubscriber.findUnique({
            where: { id },
        });
    }
    delete(id) {
        return prisma.newsletterSubscriber.delete({
            where: { id },
        });
    }
    countAll() {
        return prisma.newsletterSubscriber.count();
    }
    countActive() {
        return prisma.newsletterSubscriber.count({
            where: { status: "active" },
        });
    }
}
