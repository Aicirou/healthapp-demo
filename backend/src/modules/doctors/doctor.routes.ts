import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authenticate, requireRole } from "../../middlewares/auth.middleware";
import { createDoctorSchema, updateDoctorSchema } from "./doctor.schema";

const router = Router();

// All doctor routes require authentication
router.use(authenticate);

// Public (authenticated) — list doctors & view by id
router.get("/", doctorController.getAll);
router.get("/me", doctorController.getMyProfile);
router.get("/:id", doctorController.getById);

// Admin creates / manages doctor profiles
router.post(
  "/",
  requireRole("admin"),
  validate(createDoctorSchema),
  doctorController.create
);
router.patch(
  "/:id",
  requireRole("admin"),
  validate(updateDoctorSchema),
  doctorController.update
);
router.delete("/:id", requireRole("admin"), doctorController.remove);

export default router;
