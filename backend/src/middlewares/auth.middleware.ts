import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";
import type { User } from "../db/schema";

/**
 * Protects a route — reads Bearer token, verifies, attaches req.user.
 */
export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    next(new AppError("Authentication required", 401));
    return;
  }

  try {
    const token = header.split(" ")[1];
    const payload = verifyToken(token);
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role as User["role"],
    };
    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
};

/**
 * RBAC guard — call after authenticate.
 * Usage: requireRole("admin", "doctor")
 */
export const requireRole = (...roles: User["role"][]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError("Authentication required", 401));
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(new AppError("Insufficient permissions", 403));
      return;
    }
    next();
  };
};
