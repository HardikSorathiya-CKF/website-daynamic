export type Page = {
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
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PagePayload = {
  title: string;
  slug?: string;
  heading?: string;
  breadcrumbImage?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoSchema?: unknown;
  isActive?: boolean;
};

export type PageListResponse = {
  success: boolean;
  pages: Page[];
};

export type PageResponse = {
  success: boolean;
  message?: string;
  page: Page;
};

export type PageStatusPayload = {
  isActive: boolean;
};
