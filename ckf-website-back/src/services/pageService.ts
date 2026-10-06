import api from "./api";
import type {
  PageListResponse,
  PagePayload,
  PageResponse,
  PageStatusPayload,
} from "../types/page";
import type { ApiMessageResponse } from "../types/auth";

export const getPages = () =>
  api.get<PageListResponse>("/page").then((res) => res.data.pages ?? []);

export const getPage = (id: string) =>
  api.get<PageResponse>(`/page/${id}`).then((res) => res.data.page);

export const createPage = (data: PagePayload) =>
  api.post<PageResponse>("/page/create", data).then((res) => res.data);

export const updatePage = (id: string, data: PagePayload) =>
  api.put<PageResponse>(`/page/${id}`, data).then((res) => res.data);

export const updatePageStatus = (id: string, data: PageStatusPayload) =>
  api.patch<ApiMessageResponse>(`/page/${id}/status`, data).then((res) => res.data);

export const deletePage = (id: string) =>
  api.delete<ApiMessageResponse>(`/page/${id}`).then((res) => res.data);
