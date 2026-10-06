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
import { createService, getService, updateService } from "../../services/serviceService";
import { getApiMessage, getApiFieldError } from "../../utils/apiError";
import { hasLayoutContent } from "../../utils/layoutContent";
import type { Service, ServicePayload } from "../../types/service";
import "../../assets/css/users.css";

type ServiceFormValues = {
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

function ServiceFormFields({
  service,
  onCancel,
}: {
  service?: Service | null;
  onCancel: () => void;
}) {
  const navigate = useNavigate();
  const isEdit = !!service;
  const serviceId = service?._id || service?.id;
  const [loading, setLoading] = useState(false);
  const [breadcrumbImage, setBreadcrumbImage] = useState(service?.breadcrumbImage || "");
  const [apiErrors, setApiErrors] = useState<Record<string, string | undefined>>({});

  const { register, handleSubmit } = useForm<ServiceFormValues>({
    defaultValues: {
      title: service?.title || "",
      slug: service?.slug || "",
      heading: service?.heading || "",
      seoTitle: service?.seoTitle || "",
      seoDescription: service?.seoDescription || "",
      seoKeywords: service?.seoKeywords || "",
      seoSchema: toSeoSchemaText(service?.seoSchema),
      isActive: service?.isActive !== false,
    },
  });

  const onSubmit = async (data: ServiceFormValues) => {
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

      const payload: ServicePayload = {
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
        isEdit && service
          ? await updateService(service._id || service.id || "", payload)
          : await createService(payload);

      toast.success(
        result.message ||
          (isEdit ? "Service updated successfully." : "Service created successfully.")
      );

      navigate("/services");
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
      <Input label="Title" placeholder="Web Development" error={apiErrors.title} {...register("title")} />
      <Input label="Slug" placeholder="web-development" error={apiErrors.slug} {...register("slug")} />
      <Input label="Heading" placeholder="Web Development Services" error={apiErrors.heading} {...register("heading")} />

      <ImageUpload
        label="Breadcrumb Image"
        value={breadcrumbImage}
        error={apiErrors.breadcrumbImage}
        hint="Add an image only if this service should show a breadcrumb. Leave empty if it has no breadcrumb."
        emptyText="No breadcrumb for this service"
        onChange={setBreadcrumbImage}
      />

      <Input label="SEO Title" placeholder="SEO title" error={apiErrors.seoTitle} {...register("seoTitle")} />

      <Textarea
        label="Meta Description"
        placeholder="Meta description"
        rows={3}
        error={apiErrors.seoDescription}
        {...register("seoDescription")}
      />

      <Input label="Keyword" placeholder="web development, custom websites" error={apiErrors.seoKeywords} {...register("seoKeywords")} />

      <Textarea
        label="Schema"
        placeholder='{"@context":"https://schema.org","@type":"Service"}'
        rows={6}
        error={apiErrors.seoSchema}
        {...register("seoSchema")}
      />

      <div className="ckf-input">
        <label className="ckf-input__label">Page Content</label>
        {isEdit && serviceId ? (
          <>
            <p className="ckf-input__empty">
              {hasLayoutContent(service?.content) ? "Layout added" : "No page content yet"}
            </p>
            <Button
              type="button"
              onClick={() =>
                window.open(`/services/${serviceId}/editor`, "_blank", "noopener,noreferrer")
              }
            >
              Edit with Editor
            </Button>
          </>
        ) : (
          <p className="ckf-input__hint mb-0">
            Save this service first, then edit the page content with the editor.
          </p>
        )}
      </div>

      <div className="mb-3">
        <Checkbox label="Active" {...register("isActive")} />
      </div>

      <div className="ckf-form__actions">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Create Service"}
        </Button>
      </div>
    </Form>
  );
}

function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [service, setService] = useState<Service | null>(null);
  const [loadingService, setLoadingService] = useState(isEdit);

  const goBack = () => navigate("/services");

  useEffect(() => {
    if (!id) return;

    let active = true;

    getService(id)
      .then((data) => {
        if (active) setService(data);
      })
      .catch((error) => {
        toast.error(getApiMessage(error));
        navigate("/services");
      })
      .finally(() => {
        if (active) setLoadingService(false);
      });

    return () => {
      active = false;
    };
  }, [id, navigate]);

  return (
    <div>
      <div className="dashboard-hero mb-4">
        <div>
          <p className="dashboard-hero__eyebrow mb-1">Services</p>
          <h1 className="dashboard-hero__title mb-1">
            {isEdit ? "Edit Service" : "Create Service"}
          </h1>
          <p className="dashboard-hero__text mb-0">
            {isEdit ? "Update this service" : "Add a new service"}
          </p>
        </div>
        <Button type="button" variant="ghost" onClick={goBack}>
          Back
        </Button>
      </div>

      <div className="users-table-wrap p-4">
        {loadingService ? (
          <p className="users-empty">Loading service...</p>
        ) : (
          <ServiceFormFields
            key={service?._id || service?.id || "create"}
            service={service}
            onCancel={goBack}
          />
        )}
      </div>
    </div>
  );
}

export default ServiceForm;
