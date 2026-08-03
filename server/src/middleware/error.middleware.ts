import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues,
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Log full error details for debugging
  const anyErr = err as any;
  console.error("=== UNHANDLED ERROR ===");
  console.error("Message:", anyErr?.message);
  console.error("Code:", anyErr?.code);
  console.error("Meta:", anyErr?.meta ? JSON.stringify(anyErr.meta) : "none");
  console.error("Stack:", anyErr?.stack);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && {
      error: anyErr?.message,
      code: anyErr?.code,
    }),
  });
}