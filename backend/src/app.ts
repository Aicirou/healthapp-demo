import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { responseMiddleware } from "./middlewares/response.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import userRoutes from "./modules/users/user.routes";
import patientRoutes from "./modules/patients/patient.routes";
import doctorRoutes from "./modules/doctors/doctor.routes";

const app = express();

// ── Global middleware ───────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(responseMiddleware);

// ── Health check ────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.success({ status: "ok", timestamp: new Date().toISOString() });
});

// ── API routes ──────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);

// ── Central error handler (must be last) ────────────────
app.use(errorMiddleware);

export default app;
