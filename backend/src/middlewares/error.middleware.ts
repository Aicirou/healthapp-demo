import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import env from "../config/env";

/**
 * Central error handler — Express requires the 4-arg signature.
 * - Operational errors (AppError): send structured JSON.
 * - Programming errors: log stack, send generic 500.
 */
export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // Unknown / programming error
  console.error("Unhandled error:", err);

  res.status(500).json({
    success: false,
    message:
      env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message || "Internal server error",
  });
};
