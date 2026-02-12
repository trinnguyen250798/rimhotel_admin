import axiosClient from "@/lib/axios";
import { LoginCredentials, LoginResponse } from "@/types/auth";

export const AuthService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosClient.post("/login", credentials);
    return response as unknown as LoginResponse;
  },
};
