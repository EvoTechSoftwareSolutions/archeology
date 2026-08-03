import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
            req.user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: { id: true, name: true, email: true, role: true, department: true, isActive: true },
            });
            if (!req.user || !req.user.isActive) {
                res.status(401).json({ success: false, message: "Not authorized, user not found or inactive" });
                return;
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: "Not authorized, token failed" });
        }
    }
    else {
        res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
};
export const authenticate = protect;
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ success: false, message: `User role ${req.user?.role} is not authorized to access this route` });
            return;
        }
        next();
    };
};
