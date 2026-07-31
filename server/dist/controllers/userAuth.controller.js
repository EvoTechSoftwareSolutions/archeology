import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import generateToken from "../utils/generateToken.js";
const prisma = new PrismaClient();
const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    department: z.string().min(1, "Department is required"),
    role: z.enum(["USER", "ADMIN"]).optional(),
});
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});
export const register = async (req, res) => {
    try {
        const parsedData = registerSchema.parse(req.body);
        const userExists = await prisma.user.findUnique({
            where: { email: parsedData.email },
        });
        if (userExists) {
            res.status(400).json({ success: false, message: "User already exists" });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(parsedData.password, salt);
        const user = await prisma.user.create({
            data: {
                name: parsedData.name,
                email: parsedData.email,
                password: hashedPassword,
                department: parsedData.department,
                role: parsedData.role || "USER",
            },
        });
        const token = generateToken(res, user.id, user.role);
        res.status(201).json({
            success: true,
            token,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
            },
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ success: false, message: error.issues[0].message });
            return;
        }
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const login = async (req, res) => {
    try {
        const parsedData = loginSchema.parse(req.body);
        const user = await prisma.user.findUnique({
            where: { email: parsedData.email },
        });
        if (!user || !user.isActive) {
            res.status(401).json({ success: false, message: "Invalid credentials or inactive user" });
            return;
        }
        const isMatch = await bcrypt.compare(parsedData.password, user.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: "Invalid credentials" });
            return;
        }
        const token = generateToken(res, user.id, user.role);
        res.status(200).json({
            success: true,
            token,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
            },
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ success: false, message: error.issues[0].message });
            return;
        }
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const logout = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
};
export const getMe = async (req, res) => {
    try {
        // req.user is set by the protect middleware
        res.status(200).json({ success: true, data: req.user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
