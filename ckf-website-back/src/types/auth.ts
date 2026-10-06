export type AdminRole =
  | "superadmin"
  | "admin"
  | "developer"
  | "marketer"
  | "editor"
  | "viewer";

/* Same fields as backend Admin model (for profile / login user) */
export type User = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: AdminRole | string;
  avatar?: string;
  phone?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  lastLogin?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role?: AdminRole | string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type LoginResponse = {
  success?: boolean;
  message?: string;
  token: string;
  admin?: User;
  user?: User;
};

export type ApiMessageResponse = {
  message: string;
};

export type ProfileResponse = {
  success: boolean;
  admin: User;
};

export type ApiError = {
  message?: string;
  errors?: Record<string, string | string[]>;
};
