import type { Request, Response, NextFunction } from "express";

import type { ZodType } from "zod";

export function validate(schema: ZodType) {
  return function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
}