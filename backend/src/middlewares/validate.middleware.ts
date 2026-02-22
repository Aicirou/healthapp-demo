import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { AppError } from "../utils/AppError";

/**
 * Factory that returns an Express middleware validating req.body
 * against the given Zod schema. Strips unknown keys (`.strict()` optional).
 */
export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues.map((e) => e.message).join(", ");
        next(new AppError(message, 422));
        return;
      }
      next(err);
    }
  };
