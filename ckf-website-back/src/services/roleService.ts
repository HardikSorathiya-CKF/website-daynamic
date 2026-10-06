import api from "./api";
import type {
  PermissionGroup,
  PermissionListResponse,
  Role,
  RoleListResponse,
  RolePayload,
  RoleResponse,
  RoleStatusPayload,
} from "../types/role";
import { toPermissionGroups } from "../types/role";
import type { ApiMessageResponse } from "../types/auth";

export const getRoles = () =>
  api.get<RoleListResponse>("/role").then((res) => res.data.roles ?? []);

export const getPermissions = (): Promise<PermissionGroup[]> =>
  api
    .get<PermissionListResponse>("/role/permissions")
    .then((res) => toPermissionGroups(res.data.permissions ?? []));

export const getRole = (id: string) =>
  api.get<RoleResponse>(`/role/${id}`).then((res) => res.data.role);

export const createRole = (data: RolePayload) =>
  api.post<RoleResponse>("/role/create", data).then((res) => res.data);

export const updateRole = (id: string, data: RolePayload) =>
  api.put<ApiMessageResponse>(`/role/${id}`, data).then((res) => res.data);

export const updateRoleStatus = (id: string, data: RoleStatusPayload) =>
  api.patch<ApiMessageResponse>(`/role/${id}/status`, data).then((res) => res.data);

export const deleteRole = (id: string) =>
  api.delete<ApiMessageResponse>(`/role/${id}`).then((res) => res.data);
