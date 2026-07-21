import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must contain minimum 3 characters"),

  email: z.string().email("Invalid email format"),

  password: z.string().min(8, "Password must contain minimum 8 characters"),

  department: z.string().min(2, "Department required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password required"),
});
