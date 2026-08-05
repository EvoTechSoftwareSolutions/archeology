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
  error: "Latitude must be a number",
}),

longitude: z.coerce.number({
  error: "Longitude must be a number",
}),

anchorXPct: z.coerce.number({
  error: "Anchor X percentage must be a number",
}),

anchorYPct: z.coerce.number({
  error: "Anchor Y percentage must be a number",
}),


provinceId: z.coerce.number({
  error: "Province ID must be a number",
})
.int()
.positive(),


districtId: z.coerce.number({
  error: "District ID must be a number",
})
.int()
.positive(),

});


export const updateHistoricalPlaceSchema =
  createHistoricalPlaceSchema.partial();