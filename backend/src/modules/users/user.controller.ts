import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.register(req.body);
      res.success(result, "User registered successfully", 201);
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.login(req.body);
      res.success(result, "Login successful");
    } catch (err) {
      next(err);
    }
  },

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getProfile(req.user!.id);
      res.success(user);
    } catch (err) {
      next(err);
    }
  },

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      res.success(users);
    } catch (err) {
      next(err);
    }
  },
};
