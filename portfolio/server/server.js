import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import contactRoutes from "./routes/contactRoutes.js";

import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === "production";

// Needed for correct client IPs (rate limiting) behind proxies like Render/Railway/Nginx.
app.set("trust proxy", 1);

// ---------- Global middleware ----------
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (!isProd) app.use(morgan("dev"));

// ---------- Routes ----------
app.get("/api/health", (_req, res) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    success: true,
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    database: dbStates[mongoose.connection.readyState] ?? "unknown",
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/contact", contactRoutes);

// Phase 3+: app.use("/api/projects", projectRoutes);
// Phase 5+: app.use("/api/auth", authRoutes);
// Phase 5+: app.use("/api/contact", contactRoutes);
// Phase 4+: app.use("/api/github", githubRoutes);

// ---------- Errors ----------
app.use(notFound);
app.use(errorHandler);

// ---------- Boot ----------
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT} (${process.env.NODE_ENV || "development"})`);
  });
};

start();