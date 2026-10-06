import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ApiMessageResponse,
  ProfileResponse,
} from "../types/auth";

export const login = (data: LoginRequest) =>
  api.post<LoginResponse>("/auth/login", data).then((res) => res.data);

export const register = (data: RegisterRequest) =>
  api.post<ApiMessageResponse>("/auth/register", data).then((res) => res.data);

export const getProfile = () =>
  api.get<ProfileResponse>("/auth/profile").then((res) => res.data);

export const logout = () =>
  api.post<ApiMessageResponse>("/auth/logout").then((res) => res.data);

export const changePassword = (data: ChangePasswordRequest) =>
  api.put<ApiMessageResponse>("/auth/change-password", data).then((res) => res.data);

export const forgotPassword = (data: ForgotPasswordRequest) =>
  api.post<ApiMessageResponse>("/auth/forgot-password", data).then((res) => res.data);

export const resetPassword = (data: ResetPasswordRequest) =>
  api.post<ApiMessageResponse>("/auth/reset-password", data).then((res) => res.data);
