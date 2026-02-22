import { Router } from "express";
import { userController } from "./user.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authenticate, requireRole } from "../../middlewares/auth.middleware";
import { registerSchema, loginSchema } from "./user.schema";

const router = Router();

// Public
router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);

// Protected
router.get("/me", authenticate, userController.getProfile);

// Admin only
router.get("/", authenticate, requireRole("admin"), userController.getAllUsers);

export default router;
