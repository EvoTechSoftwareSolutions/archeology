import type { Request, Response, NextFunction } from "express";

import { authService } from "../services/auth.services.js";

class AuthController {
  async register(
    req: Request,

    res: Response,

    next: NextFunction,
  ) {
    try {
      const user = await authService.register(req.body);

      res.status(201).json({
        success: true,

        message: "User registered successfully",

        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,

    res: Response,

    next: NextFunction,
  ) {
    try {
      const result = await authService.login(
        req.body.email,

        req.body.password,
      );

      res.status(200).json({
        success: true,

        message: "Login successful",

        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
