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

nearbyHotels: z.string().optional().nullable(),
nearbyHospitals: z.string().optional().nullable(),
nearbyRestaurant: z.string().optional().nullable(),
nearbyFuel: z.string().optional().nullable(),
nearbyWashrooms: z.string().optional().nullable(),
nearbyBusStops: z.string().optional().nullable(),
nearbyParking: z.string().optional().nullable(),
nearbyRailway: z.string().optional().nullable(),
travelTips: z.string().optional().nullable(),

timelineJson: z.string().optional().nullable(),
crowd: z.string().optional().nullable(),
distance: z.string().optional().nullable(),
drivingTime: z.string().optional().nullable(),
walkingTime: z.string().optional().nullable(),
recommendedDeparture: z.string().optional().nullable(),
weather: z.string().optional().nullable(),
temperature: z.string().optional().nullable(),
photographyTime: z.string().optional().nullable(),
emergencyPolice: z.string().optional().nullable(),
emergencyAmbulance: z.string().optional().nullable(),

openingHours: z.string().optional().nullable(),
earlyMorningSlot: z.string().optional().nullable(),
midDaySlot: z.string().optional().nullable(),
lateAfternoonSlot: z.string().optional().nullable(),
visitNote: z.string().optional().nullable(),

contactAddress: z.string().optional().nullable(),
contactAdminPhone: z.string().optional().nullable(),
contactEmergencyPhone: z.string().optional().nullable(),
contactWebsite: z.string().optional().nullable(),
contactEmail: z.string().optional().nullable(),

dressCode: z.string().optional().nullable(),
photographyRules: z.string().optional().nullable(),
accessibility: z.string().optional().nullable(),
dosJson: z.string().optional().nullable(),
dontsJson: z.string().optional().nullable(),

seoTitle: z.string().optional().nullable(),
metaDescription: z.string().optional().nullable(),
slug: z.string().optional().nullable(),
focusKeywords: z.string().optional().nullable(),

});


export const updateHistoricalPlaceSchema =
  createHistoricalPlaceSchema.partial();