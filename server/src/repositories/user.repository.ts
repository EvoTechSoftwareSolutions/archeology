import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
