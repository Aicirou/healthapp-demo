import { Request, Response, NextFunction } from "express";
import type { ApiResponse } from "../types/api.types";

/**
 * Attaches res.success() and res.fail() helpers to every response.
 * Keeps controllers clean — they never build the envelope manually.
 */
export const responseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.success = (data: unknown, message = "OK", statusCode = 200) => {
    const body: ApiResponse = { success: true, data, message };
    res.status(statusCode).json(body);
  };

  res.fail = (message: string, statusCode = 400, errors?: unknown[]) => {
    const body: ApiResponse = {
      success: false,
      message,
      errors: errors as ApiResponse["errors"],
    };
    res.status(statusCode).json(body);
  };

  next();
};
