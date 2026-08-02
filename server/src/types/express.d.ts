import "express";
import type { File } from "multer";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
        email: string;
      };

      file?: File;

      files?: {
        [fieldname: string]: File[];
      };
    }
  }
}

export {};
