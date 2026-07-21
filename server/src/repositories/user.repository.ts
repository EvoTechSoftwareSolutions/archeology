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


  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }
}