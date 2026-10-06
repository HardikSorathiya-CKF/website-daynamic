import api from "./api";
import type {
  ServiceListResponse,
  ServicePayload,
  ServiceResponse,
  ServiceStatusPayload,
} from "../types/service";
import type { ApiMessageResponse } from "../types/auth";

export const getServices = () =>
  api.get<ServiceListResponse>("/service").then((res) => res.data.services ?? []);

export const getService = (id: string) =>
  api.get<ServiceResponse>(`/service/${id}`).then((res) => res.data.service);

export const createService = (data: ServicePayload) =>
  api.post<ServiceResponse>("/service/create", data).then((res) => res.data);

export const updateService = (id: string, data: ServicePayload) =>
  api.put<ServiceResponse>(`/service/${id}`, data).then((res) => res.data);

export const updateServiceStatus = (id: string, data: ServiceStatusPayload) =>
  api.patch<ApiMessageResponse>(`/service/${id}/status`, data).then((res) => res.data);

export const deleteService = (id: string) =>
  api.delete<ApiMessageResponse>(`/service/${id}`).then((res) => res.data);
