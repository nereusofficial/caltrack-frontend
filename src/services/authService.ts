import axios from "axios";
import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
} from "../models/User";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/login`,
    credentials
  );

  return response.data;
};

export const signup = async (
  userData: SignupRequest
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/signup`,
    userData
  );

  return response.data;
};

export const getProfile = async (
  token: string
): Promise<AuthResponse["user"]> => {
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};