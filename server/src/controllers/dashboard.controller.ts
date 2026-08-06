import type { Request, Response, NextFunction } from "express";

import { dashboardService } from "../services/dashboard.service.js";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const stats = await dashboardService.getStats();

    return res.status(200).json({
      success: true,

      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
