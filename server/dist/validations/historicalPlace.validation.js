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
    latitude: z
        .number({
        message: "Latitude must be a number",
    }),
    longitude: z
        .number({
        message: "Longitude must be a number",
    }),
    anchorXPct: z
        .number({
        message: "Anchor X percentage must be a number",
    }),
    anchorYPct: z
        .number({
        message: "Anchor Y percentage must be a number",
    }),
    // REQUIRED
    provinceId: z
        .number({
        message: "Province ID is required",
    })
        .int()
        .positive(),
    // REQUIRED
    districtId: z
        .number({
        message: "District ID is required",
    })
        .int()
        .positive(),
});
export const updateHistoricalPlaceSchema = createHistoricalPlaceSchema.partial();
