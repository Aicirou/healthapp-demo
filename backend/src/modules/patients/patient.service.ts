import { patientRepository } from "./patient.repository";
import { AppError } from "../../utils/AppError";
import type { CreatePatientInput, UpdatePatientInput } from "./patient.schema";

export const patientService = {
  async create(userId: string, input: CreatePatientInput) {
    // Prevent duplicate patient profile for the same user
    const existing = await patientRepository.findByUserId(userId);
    if (existing) {
      throw new AppError("Patient profile already exists for this user", 409);
    }

    return patientRepository.create({ ...input, userId });
  },

  async getAll() {
    return patientRepository.findAll();
  },

  async getById(id: string) {
    const patient = await patientRepository.findById(id);
    if (!patient) {
      throw new AppError("Patient not found", 404);
    }
    return patient;
  },

  async getMyProfile(userId: string) {
    const patient = await patientRepository.findByUserId(userId);
    if (!patient) {
      throw new AppError("Patient profile not found", 404);
    }
    return patient;
  },

  async update(id: string, input: UpdatePatientInput) {
    const patient = await patientRepository.update(id, input);
    if (!patient) {
      throw new AppError("Patient not found", 404);
    }
    return patient;
  },

  async remove(id: string) {
    const deleted = await patientRepository.remove(id);
    if (!deleted) {
      throw new AppError("Patient not found", 404);
    }
  },
};
