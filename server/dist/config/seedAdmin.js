import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@heritage.lk";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "12345678";
export async function seedAdminUser(prisma) {
    const password = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await prisma.user.upsert({
        where: { email: ADMIN_EMAIL },
        update: {
            password,
            role: "ADMIN",
            isActive: true,
        },
        create: {
            name: "Admin",
            email: ADMIN_EMAIL,
            password,
            department: "Administration",
            role: "ADMIN",
            isActive: true,
        },
    });
}
