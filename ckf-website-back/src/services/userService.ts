import api from "./api";
import type {
  User,
  UserListResponse,
  UserPayload,
  UserStatusPayload,
  CreateUserResponse,
} from "../types/user";
import type { ApiMessageResponse } from "../types/auth";

export const getUsers = () =>
  api.get<UserListResponse>("/user").then((res) => res.data.users ?? []);

export const getUser = (id: string) =>
  api.get<User>(`/user/${id}`).then((res) => res.data);

export const createUser = (data: UserPayload) =>
  api.post<CreateUserResponse>("/user/create", data).then((res) => res.data);

export const updateUser = (id: string, data: UserPayload) =>
  api.put<ApiMessageResponse>(`/user/${id}`, data).then((res) => res.data);

export const updateUserStatus = (id: string, data: UserStatusPayload) =>
  api.patch<ApiMessageResponse>(`/user/${id}/status`, data).then((res) => res.data);

export const deleteUser = (id: string) =>
  api.delete<ApiMessageResponse>(`/user/${id}`).then((res) => res.data);
