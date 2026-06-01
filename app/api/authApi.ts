import api from "./api";
import { AuthRequest, LoginResponse } from "@/app/types/auth";
const AUTH_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (
  data: AuthRequest,
): Promise<{ message: string }> => {
  const response = await api.post(`${AUTH_URL}/auth/register`, data);

  return response.data;
};

export const loginUser = async (data: AuthRequest): Promise<LoginResponse> => {
  const response = await api.post(`${AUTH_URL}/auth/login`, data);

  return response.data;
};
