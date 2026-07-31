import { z } from "zod";

export const subscribeNewsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export const updateNewsletterSubscriberSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").optional(),
  status: z.enum(["active", "inactive"]).optional(),
});
