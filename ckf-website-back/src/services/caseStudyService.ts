import api from "./api";
import type { ApiMessageResponse } from "../types/auth";
import type {
  CaseStudyListResponse,
  CaseStudyPayload,
  CaseStudyResponse,
  CaseStudyStatusPayload,
} from "../types/caseStudy";

export const getCaseStudies = () =>
  api.get<CaseStudyListResponse>("/casestudy").then((res) => res.data.caseStudies ?? []);

export const getCaseStudy = (id: string) =>
  api.get<CaseStudyResponse>(`/casestudy/${id}`).then((res) => res.data.caseStudy);

export const createCaseStudy = (data: CaseStudyPayload) =>
  api.post<CaseStudyResponse>("/casestudy/create", data).then((res) => res.data);

export const updateCaseStudy = (id: string, data: CaseStudyPayload) =>
  api.put<CaseStudyResponse>(`/casestudy/${id}`, data).then((res) => res.data);

export const updateCaseStudyStatus = (id: string, data: CaseStudyStatusPayload) =>
  api.patch<ApiMessageResponse>(`/casestudy/${id}/status`, data).then((res) => res.data);

export const deleteCaseStudy = (id: string) =>
  api.delete<ApiMessageResponse>(`/casestudy/${id}`).then((res) => res.data);
