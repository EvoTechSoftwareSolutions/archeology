import type { Request, Response, NextFunction } from "express";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Generate the URL based on the server host and file path
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: fileUrl,
      },
    });
  } catch (error) {
    next(error);
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
