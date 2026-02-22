/* eslint-disable @typescript-eslint/no-namespace */
import type { User } from "../db/schema";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: User["role"];
      };
    }

    interface Response {
      success: (data: unknown, message?: string, statusCode?: number) => void;
      fail: (message: string, statusCode?: number, errors?: unknown[]) => void;
    }
  }
}

export {};
