export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  height: number; // cm
  weight: number; // kg
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  height: number;
  weight: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}