import type { Request, Response } from "express";
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
  }
};
