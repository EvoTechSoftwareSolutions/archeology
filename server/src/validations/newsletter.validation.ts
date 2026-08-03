import { z } from "zod";

export const subscribeNewsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export const updateNewsletterSubscriberSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").optional(),
  status: z.enum(["active", "inactive"]).optional(),
<<<<<<< HEAD
});
=======
});
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
