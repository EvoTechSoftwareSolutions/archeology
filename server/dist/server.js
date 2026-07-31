import "dotenv/config";
import app from "./app.js";
import prisma, { connectDB } from "./config/db.js";
import { seedAdminUser } from "./config/seedAdmin.js";
const PORT = process.env.PORT || 5000;
async function startServer() {
    try {
        await connectDB();
        await seedAdminUser(prisma);
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Unable to start server");
        console.error(error);
        process.exit(1);
    }
}
startServer();
