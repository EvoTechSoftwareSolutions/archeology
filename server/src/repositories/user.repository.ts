import { prisma } from "../prisma/prisma.js";
import type { Prisma } from "@prisma/client";

export class UserRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  findById(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        isActive: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: {
        id,
      },

      data,

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  softDelete(id: number) {
    return prisma.user.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },
    });
  }
}
