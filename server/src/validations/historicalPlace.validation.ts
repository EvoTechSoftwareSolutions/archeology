import { z } from "zod";

export const createHistoricalPlaceSchema = z.object({

  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  category: z
    .string()
    .min(2, "Category is required"),

  description: z
    .string()
    .optional(),

  image: z
    .string()
    .optional(),

  century: z
    .string()
    .min(1, "Century is required"),

  statusFlag: z
    .string()
    .min(1, "Status is required"),


  latitude: z.coerce.number({
      invalid_type_error: "Latitude must be a number",
      required_error: "Latitude is required",
    }),

  longitude: z.coerce.number({
      invalid_type_error: "Longitude must be a number",
      required_error: "Longitude is required",
    }),

  anchorXPct: z.coerce.number({
      invalid_type_error: "Anchor X percentage must be a number",
      required_error: "Anchor X percentage is required",
    }),

  anchorYPct: z.coerce.number({
      invalid_type_error: "Anchor Y percentage must be a number",
      required_error: "Anchor Y percentage is required",
    }),

  // REQUIRED
  provinceId: z.coerce.number({
      invalid_type_error: "Province ID must be a number",
      required_error: "Province ID is required",
    })
    .int()
    .positive(),

  // REQUIRED
  districtId: z.coerce.number({
      invalid_type_error: "District ID must be a number",
      required_error: "District ID is required",
    })
    .int()
    .positive(),

});


export const updateHistoricalPlaceSchema =
  createHistoricalPlaceSchema.partial();