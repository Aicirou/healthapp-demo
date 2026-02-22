import { Router } from "express";
import { patientController } from "./patient.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authenticate, requireRole } from "../../middlewares/auth.middleware";
import { createPatientSchema, updatePatientSchema } from "./patient.schema";

const router = Router();

// All patient routes require authentication
router.use(authenticate);

// Patient can view own profile
router.get("/me", patientController.getMyProfile);

// Create patient profile (any authenticated user)
router.post("/", validate(createPatientSchema), patientController.create);

// Admin / Doctor can list all and manage
router.get("/", requireRole("admin", "doctor"), patientController.getAll);
router.get("/:id", requireRole("admin", "doctor"), patientController.getById);
router.patch(
  "/:id",
  requireRole("admin", "doctor"),
  validate(updatePatientSchema),
  patientController.update
);
router.delete("/:id", requireRole("admin"), patientController.remove);

export default router;
