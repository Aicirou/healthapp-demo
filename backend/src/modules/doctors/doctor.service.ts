import { doctorRepository } from "./doctor.repository";
import { AppError } from "../../utils/AppError";
import type { CreateDoctorInput, UpdateDoctorInput } from "./doctor.schema";

export const doctorService = {
  async create(input: CreateDoctorInput) {
    const existing = await doctorRepository.findByUserId(input.userId);
    if (existing) {
      throw new AppError("Doctor profile already exists for this user", 409);
    }

    return doctorRepository.create(input);
  },

  async getAll() {
    return doctorRepository.findAll();
  },

  async getById(id: string) {
    const doctor = await doctorRepository.findById(id);
    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }
    return doctor;
  },

  async getMyProfile(userId: string) {
    const doctor = await doctorRepository.findByUserId(userId);
    if (!doctor) {
      throw new AppError("Doctor profile not found", 404);
    }
    return doctor;
  },

  async update(id: string, input: UpdateDoctorInput) {
    const doctor = await doctorRepository.update(id, input);
    if (!doctor) {
      throw new AppError("Doctor not found", 404);
    }
    return doctor;
  },

  async remove(id: string) {
    const deleted = await doctorRepository.remove(id);
    if (!deleted) {
      throw new AppError("Doctor not found", 404);
    }
  },
};
