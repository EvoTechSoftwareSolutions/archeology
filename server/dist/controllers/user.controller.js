import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// @desc    Update user role or active status
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
    try {
        const { role, isActive } = req.body;
        const userId = parseInt(req.params.id);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error or user not found" });
    }
};
// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ success: false, message: "Invalid user ID" });
            return;
        }
        await prisma.user.delete({
            where: { id: userId },
        });
        res.status(200).json({ success: true, message: "User deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error or user not found" });
    }
};
