export type Service = {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  heading?: string;
  breadcrumbImage?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoSchema?: unknown;
  content?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ServicePayload = {
  title: string;
  slug?: string;
  heading?: string;
  breadcrumbImage?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoSchema?: unknown;
  content?: string;
  isActive?: boolean;
};

export type ServiceListResponse = {
  success: boolean;
  services: Service[];
};

export type ServiceResponse = {
  success: boolean;
  message?: string;
  service: Service;
};

export type ServiceStatusPayload = {
  isActive: boolean;
};
