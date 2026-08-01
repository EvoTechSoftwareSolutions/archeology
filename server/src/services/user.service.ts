import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";

const prisma = new PrismaClient();

class UserService {
  // Get all users
  async getAllUsers() {
    const users = await prisma.user.findMany({
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

    return users;
  }

  // Update user
  async updateUser(
    id: number,
    data: {
      name?: string;
      email?: string;
      role?: string;
      department?: string;
      isActive?: boolean;
    },
  ) {
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      throw new ApiError(404, "User not found");
    }

    const user = await prisma.user.update({
      where: {
        id,
      },

      data: {
        ...(data.name && {
          name: data.name,
        }),

        ...(data.email && {
          email: data.email,
        }),

        ...(data.role && {
          role: data.role,
        }),

        ...(data.department && {
          department: data.department,
        }),

        ...(data.isActive !== undefined && {
          isActive: data.isActive,
        }),
      },

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

    return user;
  }

  // Delete user
  async deleteUser(id: number) {
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      throw new ApiError(404, "User not found");
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      message: "User deleted successfully",
    };
  }
}

export const userService = new UserService();
