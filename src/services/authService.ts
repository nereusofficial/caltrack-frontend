import axios from "axios";
import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
} from "../models/User";

const API_URL = import.meta.env.VITE_API_URL;

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

export const forgotPassword = async (
  email: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/forgot-password`,
    { email }
  );

  return response.data;
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/reset-password`,
    {
      token,
      password,
    }
  );

  return response.data;
};

export const googleAuth = async (accessToken: string, mode: "login" | "signup"): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/google`,
    { accessToken, mode }
  );
  return response.data;
};

export const facebookAuth = async (accessToken: string, mode: "login" | "signup"): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/facebook`,
    { accessToken, mode }
  );
  return response.data;
};