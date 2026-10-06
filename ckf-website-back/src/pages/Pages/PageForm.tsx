import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import { createPage, getPage, updatePage } from "../../services/pageService";
import { getApiMessage, getApiFieldError } from "../../utils/apiError";
import type { Page, PagePayload } from "../../types/page";
import "../../assets/css/users.css";

type PageFormValues = {
  title: string;
  slug: string;
  heading: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoSchema: string;
  isActive: boolean;
};

const toSeoSchemaText = (value?: unknown) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
};

function PageFormFields({
  page,
  onCancel,
}: {
  page?: Page | null;
  onCancel: () => void;
}) {
  const navigate = useNavigate();
  const isEdit = !!page;
  const [loading, setLoading] = useState(false);
  const [breadcrumbImage, setBreadcrumbImage] = useState(page?.breadcrumbImage || "");
  const [apiErrors, setApiErrors] = useState<Record<string, string | undefined>>({});

  const { register, handleSubmit } = useForm<PageFormValues>({
    defaultValues: {
      title: page?.title || "",
      slug: page?.slug || "",
      heading: page?.heading || "",
      seoTitle: page?.seoTitle || "",
      seoDescription: page?.seoDescription || "",
      seoKeywords: page?.seoKeywords || "",
      seoSchema: toSeoSchemaText(page?.seoSchema),
      isActive: page?.isActive !== false,
    },
  });

  const onSubmit = async (data: PageFormValues) => {
    try {
      setLoading(true);
      setApiErrors({});

      let seoSchema: unknown = null;

      if (data.seoSchema.trim()) {
        try {
          seoSchema = JSON.parse(data.seoSchema);
        } catch {
          setApiErrors({ seoSchema: "Enter valid JSON schema." });
          setLoading(false);
          return;
        }
      }

      const payload: PagePayload = {
        title: data.title,
        slug: data.slug,
        heading: data.heading,
        breadcrumbImage: breadcrumbImage || null,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        seoKeywords: data.seoKeywords,
        seoSchema,
        isActive: data.isActive,
      };

      const result =
        isEdit && page
          ? await updatePage(page._id || page.id || "", payload)
          : await createPage(payload);

      toast.success(
        result.message || (isEdit ? "Page updated successfully." : "Page created successfully.")
      );

      navigate("/pages");
    } catch (error) {
      toast.error(getApiMessage(error));
      setApiErrors({
        title: getApiFieldError(error, "title"),
        slug: getApiFieldError(error, "slug"),
        heading: getApiFieldError(error, "heading"),
        breadcrumbImage: getApiFieldError(error, "breadcrumbImage"),
        seoTitle: getApiFieldError(error, "seoTitle"),
        seoDescription: getApiFieldError(error, "seoDescription"),
        seoKeywords: getApiFieldError(error, "seoKeywords"),
        seoSchema: getApiFieldError(error, "seoSchema"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="ckf-form--page" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Title"
        placeholder="About Us"
        error={apiErrors.title}
        {...register("title")}
      />

      <Input
        label="Slug"
        placeholder="about-us"
        error={apiErrors.slug}
        {...register("slug")}
      />

      <Input
        label="Heading"
        placeholder="Building Smart Digital Solutions for Growing Businesses"
        error={apiErrors.heading}
        {...register("heading")}
      />

      <ImageUpload
        label="Breadcrumb Image"
        value={breadcrumbImage}
        error={apiErrors.breadcrumbImage}
        hint="Add an image only if this page should show a breadcrumb. Leave empty if this page has no breadcrumb."
        emptyText="No breadcrumb for this page"
        onChange={setBreadcrumbImage}
      />

      <Input
        label="SEO Title"
        placeholder="SEO title"
        error={apiErrors.seoTitle}
        {...register("seoTitle")}
      />

      <Textarea
        label="SEO Description"
        placeholder="SEO description"
        rows={3}
        error={apiErrors.seoDescription}
        {...register("seoDescription")}
      />

      <Input
        label="SEO Keywords"
        placeholder="page, about, company"
        error={apiErrors.seoKeywords}
        {...register("seoKeywords")}
      />

      <Textarea
        label="SEO Schema"
        placeholder='{"@context":"https://schema.org","@type":"WebPage"}'
        rows={6}
        error={apiErrors.seoSchema}
        {...register("seoSchema")}
      />

      <div className="mb-3">
        <Checkbox label="Active" {...register("isActive")} />
      </div>

      <div className="ckf-form__actions">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Create Page"}
        </Button>
      </div>
    </Form>
  );
}

function PageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [page, setPage] = useState<Page | null>(null);
  const [loadingPage, setLoadingPage] = useState(isEdit);

  const goBack = () => navigate("/pages");

  useEffect(() => {
    if (!id) return;

    let active = true;

    getPage(id)
      .then((data) => {
        if (active) setPage(data);
      })
      .catch((error) => {
        toast.error(getApiMessage(error));
        navigate("/pages");
      })
      .finally(() => {
        if (active) setLoadingPage(false);
      });

    return () => {
      active = false;
    };
  }, [id, navigate]);

  return (
    <div>
      <div className="dashboard-hero mb-4">
        <div>
          <p className="dashboard-hero__eyebrow mb-1">Pages</p>
          <h1 className="dashboard-hero__title mb-1">
            {isEdit ? "Edit Page" : "Create Page"}
          </h1>
          <p className="dashboard-hero__text mb-0">
            {isEdit ? "Update this page" : "Add a new page"}
          </p>
        </div>
        <Button type="button" variant="ghost" onClick={goBack}>
          Back
        </Button>
      </div>

      <div className="users-table-wrap p-4">
        {loadingPage ? (
          <p className="users-empty">Loading page...</p>
        ) : (
          <PageFormFields
            key={page?._id || page?.id || "create"}
            page={page}
            onCancel={goBack}
          />
        )}
      </div>
    </div>
  );
}

export default PageForm;
