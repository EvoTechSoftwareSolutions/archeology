import type { Request, Response } from "express";
<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
export const getAllUsers = async (req: Request, res: Response) => {
  try {
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
        createdAt: 'desc'
      }
    });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Update user role or active status
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { role, isActive } = req.body;
    const userId = parseInt(req.params.id as string);

    if (isNaN(userId)) {
       res.status(400).json({ success: false, message: "Invalid user ID" });
       return;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        role: role,
        isActive: isActive,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        isActive: true,
      }
    });

    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error or user not found" });
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id as string);

    if (isNaN(userId)) {
       res.status(400).json({ success: false, message: "Invalid user ID" });
       return;
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error or user not found" });
=======
import { userService } from "../services/user.service.js";

// Get all users

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,

      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Update user

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,

        message: "Invalid user id",
      });
    }

    const user = await userService.updateUser(userId, req.body);

    res.status(200).json({
      success: true,

      message: "User updated successfully",

      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Delete user

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,

        message: "Invalid user id",
      });
    }

    const result = await userService.deleteUser(userId);

    res.status(200).json({
      success: true,

      message: result.message,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
  }
};
