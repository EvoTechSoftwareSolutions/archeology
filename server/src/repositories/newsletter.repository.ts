import { prisma } from "../prisma/prisma.js";
import type { Prisma } from "@prisma/client";

export class NewsletterRepository {
  findByEmail(email: string) {
    return prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
  }

  create(data: Prisma.NewsletterSubscriberCreateInput) {
    return prisma.newsletterSubscriber.create({
      data,
    });
  }

  update(id: number, data: Prisma.NewsletterSubscriberUpdateInput) {
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

  findById(id: number) {
    return prisma.newsletterSubscriber.findUnique({
      where: { id },
    });
  }

  delete(id: number) {
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
