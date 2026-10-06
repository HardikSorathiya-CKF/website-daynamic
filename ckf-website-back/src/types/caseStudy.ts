export type CaseStudy = {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  slug: string;
  expertContent?: string;
  description?: string;
  featureImage?: string | null;
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

export type CaseStudyPayload = {
  title: string;
  subtitle?: string;
  slug?: string;
  expertContent?: string;
  description?: string;
  featureImage?: string | null;
  breadcrumbImage?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoSchema?: unknown;
  isActive?: boolean;
};

export type CaseStudyListResponse = {
  success: boolean;
  caseStudies: CaseStudy[];
};

export type CaseStudyResponse = {
  success: boolean;
  message?: string;
  caseStudy: CaseStudy;
};

export type CaseStudyStatusPayload = {
  isActive: boolean;
};
