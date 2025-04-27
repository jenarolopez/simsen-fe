import { z } from "zod";

// Schema for step 1
export const bookingStep1Schema = z.object({
  pickupDate: z.string().min(1, "Pickup date is required"),
  tourists: z.string().min(1, "Number of tourists is required").refine(
    (val) => parseInt(val) > 0 && parseInt(val) <= 10,
    "Number of tourists must be between 1 and 10"
  ),
});

// Schema for tourist details
const touristSchema = z.object({
  name: z.string().min(2, "Tourist name is required"),
  email: z.string().email("Invalid email address"),
});

// Schema for step 2
export const bookingStep2Schema = z.object({
  touristDetails: z.array(touristSchema),
});

export type BookingStep1Values = z.infer<typeof bookingStep1Schema>;
export type BookingStep2Values = z.infer<typeof bookingStep2Schema>;