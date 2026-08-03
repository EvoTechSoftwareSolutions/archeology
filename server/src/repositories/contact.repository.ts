import type { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma.js";

export class ContactRepository {
  create(data: Prisma.ContactMessageCreateInput) {
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

  findById(id: number) {
    return prisma.contactMessage.findUnique({
      where: { id },
    });
  }

  update(id: number, data: Prisma.ContactMessageUpdateInput) {
    return prisma.contactMessage.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
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
