import { z } from "zod";
export const createHistoricalPlaceSchema = z.object({
    name: z.string().min(3),
    category: z.string().min(2),
    description: z.string().optional(),
    image: z.string().optional(),
    century: z.string(),
    statusFlag: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    anchorXPct: z.number(),
    anchorYPct: z.number(),
    districtId: z.number(),
});
export const updateHistoricalPlaceSchema = createHistoricalPlaceSchema.partial();
