import { z } from "zod";

export const createContactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.string().trim().min(2, "Subject must be at least 2 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export const updateContactMessageSchema = z.object({
  status: z.enum(["unread", "read", "archived"]),
});