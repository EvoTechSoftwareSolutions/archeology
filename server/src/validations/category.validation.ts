import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
<<<<<<< HEAD
});
=======
});
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
