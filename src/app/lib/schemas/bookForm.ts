import { z } from "zod";

export const bookFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number must be at least 10 digits"),
  referral: z.string().min(1, "Please select referral"),
  experience: z.string().min(1, "Please select an experience"),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;