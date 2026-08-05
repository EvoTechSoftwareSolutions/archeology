import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/userAuth.routes.js";
import userRoutes from "./routes/user.routes.js";
import provinceRoutes from "./routes/province.routes.js";
import districtRoutes from "./routes/district.routes.js";
import historicalPlaceRoutes from "./routes/historicalPlace.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import reviewRoutes from "./routes/review.routes.js";

// Middleware
import { errorHandler } from "./middleware/error.middleware.js";
import { notFound } from "./middleware/notFound.middleware.js";

const app = express();

// ======================
// Security Middleware
// ======================

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(hpp());

// ======================
// Body Parser Middleware
// ======================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());
app.use(hpp());
// ======================
// Health Check
// ======================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running Successfully",
  });
});

// ======================
// API Routes
// ======================

const API_VERSION = "/api/v1";

app.use(`${API_VERSION}/auth`, authRoutes);
app.use(`${API_VERSION}/users`, userRoutes);
app.use(`${API_VERSION}/provinces`, provinceRoutes);
app.use(`${API_VERSION}/districts`, districtRoutes);
app.use(`${API_VERSION}/historicalPlace`, historicalPlaceRoutes);
app.use(`${API_VERSION}/newsletter`, newsletterRoutes);
app.use(`${API_VERSION}/contact`, contactRoutes);
app.use(`${API_VERSION}/upload`, uploadRoutes);
app.use(`${API_VERSION}/categories`, categoryRoutes);
app.use(`${API_VERSION}/reviews`, reviewRoutes);

// ======================
// Static Files
// ======================

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ======================
// Error Handling
// ======================

app.use(notFound);

app.use(errorHandler);

export default app;
