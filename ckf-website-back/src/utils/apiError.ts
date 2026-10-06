import axios from "axios";
import type { ApiError } from "../types/auth";

export const getApiMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiError | undefined;
    if (data?.message) return data.message;
  }
  return "Something went wrong";
};

export const getApiFieldError = (error: unknown, field: string): string | undefined => {
  if (!axios.isAxiosError(error)) return undefined;

  const data = error.response?.data as ApiError | undefined;
  const value = data?.errors?.[field];

  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
};

export const getApiFieldErrors = (error: unknown, fields: string[]) =>
  Object.fromEntries(fields.map((field) => [field, getApiFieldError(error, field)]));
