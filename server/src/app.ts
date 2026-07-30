import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import hpp from "hpp";


import provinceRoutes from "./routes/province.routes.js";
import districtRoutes from "./routes/district.routes.js"
import  historicalPlace  from "./routes/historicalPlace.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import { notFound } from "./middleware/notFound.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(hpp());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running Successfully",
  });
});


app.use("/api/v1/provinces", provinceRoutes);
app.use("/api/v1/districts", districtRoutes);
app.use("/api/v1/historicalPlace", historicalPlace);

app.use(notFound);
app.use(errorHandler);

export default app;