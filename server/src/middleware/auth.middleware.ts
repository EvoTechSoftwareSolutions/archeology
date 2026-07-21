import type { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt.js";

import { ApiError } from "../utils/ApiError.js";

export interface AuthRequest extends Request {
  user?: any;
}

export function authenticate(
  req: AuthRequest,

  res: Response,

  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication required");
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
}
