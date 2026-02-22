import { Request, Response, NextFunction } from "express";
import { doctorService } from "./doctor.service";

export const doctorController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await doctorService.create(req.body);
      res.success(doctor, "Doctor profile created", 201);
    } catch (err) {
      next(err);
    }
  },

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const doctors = await doctorService.getAll();
      res.success(doctors);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await doctorService.getById(req.params.id as string);
      res.success(doctor);
    } catch (err) {
      next(err);
    }
  },

  async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await doctorService.getMyProfile(req.user!.id);
      res.success(doctor);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await doctorService.update(req.params.id as string, req.body);
      res.success(doctor, "Doctor updated");
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await doctorService.remove(req.params.id as string);
      res.success(null, "Doctor deleted");
    } catch (err) {
      next(err);
    }
  },
};
