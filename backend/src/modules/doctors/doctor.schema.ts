import { z } from "zod";

export const createDoctorSchema = z.object({
  userId: z.string().uuid("Valid user ID required"),
  specialization: z.string().min(1, "Specialization is required").max(100),
  licenseNumber: z.string().min(1, "License number is required").max(50),
  department: z.string().min(1, "Department is required").max(100),
  phone: z.string().min(7, "Phone number is required"),
  bio: z.string().optional(),
  isAvailable: z.boolean().optional().default(true),
});

export const updateDoctorSchema = createDoctorSchema.partial();

export type CreateDoctorInput = z.infer<typeof createDoctorSchema>;
export type UpdateDoctorInput = z.infer<typeof updateDoctorSchema>;
