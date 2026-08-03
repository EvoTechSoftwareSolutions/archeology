import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import path from "path";
import { fileURLToPath } from "url";

<<<<<<< HEAD

import provinceRoutes from "./routes/province.routes.js";
import districtRoutes from "./routes/district.routes.js";
import historicalPlace from "./routes/historicalPlace.routes.js";
=======
// Routes
import authRoutes from "./routes/userAuth.routes.js";
import userRoutes from "./routes/user.routes.js";
import provinceRoutes from "./routes/province.routes.js";
import districtRoutes from "./routes/district.routes.js";
import historicalPlaceRoutes from "./routes/historicalPlace.routes.js";
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
import newsletterRoutes from "./routes/newsletter.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import reviewRoutes from "./routes/review.routes.js";
<<<<<<< HEAD
import authRoutes from "./routes/userAuth.routes.js";
import userRoutes from "./routes/user.routes.js";
import path from "path";
import { fileURLToPath } from "url";
=======
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c

// Middleware
import { errorHandler } from "./middleware/error.middleware.js";
import { notFound } from "./middleware/notFound.middleware.js";

const app = express();

<<<<<<< HEAD
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
=======
// ======================
// Security Middleware
// ======================

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
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

// ======================
// Health Check
// ======================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running Successfully",
  });
});

<<<<<<< HEAD

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/provinces", provinceRoutes);
app.use("/api/v1/districts", districtRoutes);
app.use("/api/v1/historicalPlace", historicalPlace);
app.use("/api/v1/newsletter", newsletterRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/reviews", reviewRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
=======
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
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c

app.use(notFound);

app.use(errorHandler);

export default app;
