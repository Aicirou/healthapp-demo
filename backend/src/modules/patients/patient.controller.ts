import { Request, Response, NextFunction } from "express";
import { patientService } from "./patient.service";

export const patientController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const patient = await patientService.create(req.user!.id, req.body);
      res.success(patient, "Patient created", 201);
    } catch (err) {
      next(err);
    }
  },

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const patients = await patientService.getAll();
      res.success(patients);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const patient = await patientService.getById(req.params.id as string);
      res.success(patient);
    } catch (err) {
      next(err);
    }
  },

  async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const patient = await patientService.getMyProfile(req.user!.id);
      res.success(patient);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const patient = await patientService.update(req.params.id as string, req.body);
      res.success(patient, "Patient updated");
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await patientService.remove(req.params.id as string);
      res.success(null, "Patient deleted");
    } catch (err) {
      next(err);
    }
  },
};
