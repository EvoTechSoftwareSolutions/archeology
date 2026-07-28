import { z } from "zod";

export const createDistrictSchema = z.object({
  name: z
    .string()
    .min(2, "District name must be at least 2 characters")
    .max(100, "District name cannot exceed 100 characters")
    .trim(),

  provinceId: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Province ID is required"
          : "Province ID must be a number",
    })
    .int("Province ID must be an integer")
    .positive("Province ID must be a positive number"),
});

export const updateDistrictSchema = z.object({

    name: z
        .string()
        .min(3)
        .optional(),


    provinceId: z
        .number()
        .int()
        .optional()

});