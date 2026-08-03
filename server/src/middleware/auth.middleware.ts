import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add user to Request interface
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId || decoded.id },
        select: { id: true, name: true, email: true, role: true, department: true, isActive: true },
      });

      if (!user || !user.isActive) {
        res.status(401).json({ success: false, message: "Not authorized, user not found or inactive" });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

export const protect = authenticate;

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: `User role ${req.user?.role} is not authorized to access this route` });
      return;
    }
    next();
  };
};
