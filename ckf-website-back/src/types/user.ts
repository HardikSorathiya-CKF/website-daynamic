import type { AdminRole } from "./auth";

/* User list item - same model as backend */
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

export type UserListResponse = {
  success: boolean;
  users: User[];
};

export type UserPayload = {
  name: string;
  email: string;
  password?: string;
  role?: AdminRole | string;
  phone?: string;
  avatar?: string;
  isActive?: boolean;
};

export type CreateUserResponse = {
  success: boolean;
  message: string;
  user: User;
};

export type UserStatusPayload = {
  isActive: boolean;
};
