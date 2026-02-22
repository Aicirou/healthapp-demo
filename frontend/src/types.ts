export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "doctor" | "patient";
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface Patient {
  id: string;
  userId: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address?: string;
  medicalRecordNumber: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  userId: string;
  specialization: string;
  licenseNumber: string;
  department: string;
  phone: string;
  bio?: string;
  isAvailable: boolean;
  createdAt: string;
}
