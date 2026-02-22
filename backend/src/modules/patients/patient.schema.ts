import { z } from "zod";

export const createPatientSchema = z.object({
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format"),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().min(7, "Phone number is required"),
  address: z.string().optional(),
  medicalRecordNumber: z.string().min(1, "Medical record number is required"),
});

export const updatePatientSchema = createPatientSchema.partial();

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
