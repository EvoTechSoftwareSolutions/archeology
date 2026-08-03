import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";


const prisma = new PrismaClient();


// Extend Express Request globally
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      name: string;
      email: string;
      role: string;
      department: string;
      isActive: boolean;
    };
  }
}


// Authenticate User
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    let token: string | undefined;


    const authHeader = req.headers.authorization;


    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }


    if (!token && req.cookies?.jwt) {
      token = req.cookies.jwt;
    }


    if (!token) {
      throw new ApiError(401, "Authentication required");
    }


    const decoded = verifyToken(token) as {
      id: number;
      email: string;
      role: string;
    };


    const user = await prisma.user.findUnique({

      where: {
        id: decoded.id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        isActive: true,
      },

    });


    if (!user) {
      throw new ApiError(401, "User not found");
    }


    if (!user.isActive) {
      throw new ApiError(401, "User account inactive");
    }


    req.user = user;


    next();


  } catch(error) {
    next(error);
  }
}




export function authorize(...roles: string[]) {

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {


    if (!req.user) {
      return next(
        new ApiError(401, "Authentication required")
      );
    }


    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          "Access denied"
        )
      );
    }


    next();
  };
}