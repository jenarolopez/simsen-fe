import { z } from "zod";

export const bookFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number must be at least 10 digits"),
  referral: z.enum(["social", "friend", "search", "other"], {
    required_error: "Please select how you heard about us",
  }),
  experience: z.string().min(1, "Please select an experience"),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;