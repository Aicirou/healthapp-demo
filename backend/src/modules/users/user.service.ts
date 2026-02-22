import { userRepository } from "./user.repository";
import { hashPassword, comparePassword } from "../../utils/hash";
import { signToken } from "../../utils/jwt";
import { AppError } from "../../utils/AppError";
import type { RegisterInput, LoginInput } from "./user.schema";

export const userService = {
  async register(input: RegisterInput) {
    // Check duplicate
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw new AppError("Email already registered", 409);
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await userRepository.create({
      email: input.email,
      password: hashedPassword,
      name: input.name,
      role: input.role,
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    };
  },

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const valid = await comparePassword(input.password, user.password);
    if (!valid) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    };
  },

  async getAllUsers() {
    const allUsers = await userRepository.findAll();
    return allUsers.map(({ password, ...rest }) => rest);
  },

  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const { password, ...rest } = user;
    return rest;
  },
};
