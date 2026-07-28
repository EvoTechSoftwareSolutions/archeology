import { z } from "zod";


export const createProvinceSchema = z.object({

    name: z
        .string()
        .min(3, "Province name must contain minimum 3 characters"),


    regionCode: z
        .string()
        .min(2, "Region code is required")
        .max(5, "Region code too long")

});

export const updateProvinceSchema = z.object({

    name: z
        .string()
        .min(3)
        .optional(),


    regionCode: z
        .string()
        .min(2)
        .optional()

});