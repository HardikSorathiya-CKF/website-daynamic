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
import {
  createCaseStudy,
  getCaseStudy,
  updateCaseStudy,
} from "../../services/caseStudyService";
import { getApiMessage, getApiFieldErrors } from "../../utils/apiError";
import { hasLayoutContent } from "../../utils/layoutContent";
import type { CaseStudy } from "../../types/caseStudy";
import "../../assets/css/users.css";

type FormValues = {
  title: string;
  subtitle: string;
  slug: string;
  expertContent: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoSchema: string;
  isActive: boolean;
};

const FORM_FIELDS = [
  "title",
  "subtitle",
  "slug",
  "expertContent",
  "featureImage",
  "breadcrumbImage",
  "seoTitle",
  "seoDescription",
  "seoKeywords",
  "seoSchema",
];

const toSchemaText = (value?: unknown) => {
  if (!value) return "";
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
};

function CaseStudyFormFields({
  item,
  onCancel,
}: {
  item?: CaseStudy | null;
  onCancel: () => void;
}) {
  const navigate = useNavigate();
  const isEdit = !!item;
  const caseStudyId = item?._id || item?.id;
  const [loading, setLoading] = useState(false);
  const [featureImage, setFeatureImage] = useState(item?.featureImage || "");
  const [breadcrumbImage, setBreadcrumbImage] = useState(item?.breadcrumbImage || "");
  const [apiErrors, setApiErrors] = useState<Record<string, string | undefined>>({});

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: item?.title || "",
      subtitle: item?.subtitle || "",
      slug: item?.slug || "",
      expertContent: item?.expertContent || "",
      seoTitle: item?.seoTitle || "",
      seoDescription: item?.seoDescription || "",
      seoKeywords: item?.seoKeywords || "",
      seoSchema: toSchemaText(item?.seoSchema),
      isActive: item?.isActive !== false,
    },
  });

  const onSubmit = async (data: FormValues) => {
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

      const payload = {
        ...data,
        featureImage: featureImage || null,
        breadcrumbImage: breadcrumbImage || null,
        seoSchema,
      };

      const result =
        isEdit && item
          ? await updateCaseStudy(item._id || item.id || "", payload)
          : await createCaseStudy(payload);

      toast.success(
        result.message ||
          (isEdit ? "Case study updated successfully." : "Case study created successfully.")
      );
      navigate("/case-studies");
    } catch (error) {
      toast.error(getApiMessage(error));
      setApiErrors(getApiFieldErrors(error, FORM_FIELDS));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="ckf-form--page" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Title" placeholder="Healthcare Platform" error={apiErrors.title} {...register("title")} />
      <Input label="Subtitle" placeholder="Digital transformation for clinics" error={apiErrors.subtitle} {...register("subtitle")} />
      <Input label="Slug" placeholder="healthcare-platform" error={apiErrors.slug} {...register("slug")} />
      <Textarea label="Expert Content" placeholder="Detailed case study content" rows={2} error={apiErrors.expertContent} {...register("expertContent")} />

      <div className="ckf-input">
        <label className="ckf-input__label">Description</label>
        {isEdit && caseStudyId ? (
          <>
            <p className="ckf-input__empty">
              {hasLayoutContent(item?.description)
                ? "Layout added"
                : "No description layout yet"}
            </p>
            <Button
              type="button"
              onClick={() =>
                window.open(`/case-studies/${caseStudyId}/editor`, "_blank", "noopener,noreferrer")
              }
            >
              Edit with Editor
            </Button>
          </>
        ) : (
          <p className="ckf-input__hint mb-0">
            Save this case study first, then edit the description with the editor.
          </p>
        )}
      </div>

      <ImageUpload
        label="Feature Image"
        value={featureImage}
        error={apiErrors.featureImage}
        emptyText="No feature image for this case study"
        onChange={setFeatureImage}
      />

      <ImageUpload
        label="Breadcrumb Image"
        value={breadcrumbImage}
        error={apiErrors.breadcrumbImage}
        hint="Add an image only if this case study should show a breadcrumb. Leave empty if it has no breadcrumb."
        emptyText="No breadcrumb for this case study"
        onChange={setBreadcrumbImage}
      />

      <Input label="SEO Title" placeholder="SEO title" error={apiErrors.seoTitle} {...register("seoTitle")} />
      <Textarea label="SEO Description" placeholder="SEO description" rows={3} error={apiErrors.seoDescription} {...register("seoDescription")} />
      <Input label="SEO Keywords" placeholder="case study, healthcare, product" error={apiErrors.seoKeywords} {...register("seoKeywords")} />
      <Textarea
        label="SEO Schema"
        placeholder='{"@context":"https://schema.org","@type":"Article"}'
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
          {isEdit ? "Save Changes" : "Create Case Study"}
        </Button>
      </div>
    </Form>
  );
}

function CaseStudyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [item, setItem] = useState<CaseStudy | null>(null);
  const [loadingItem, setLoadingItem] = useState(isEdit);
  const goBack = () => navigate("/case-studies");

  useEffect(() => {
    if (!id) return;

    let active = true;

    getCaseStudy(id)
      .then((data) => {
        if (active) setItem(data);
      })
      .catch((error) => {
        toast.error(getApiMessage(error));
        navigate("/case-studies");
      })
      .finally(() => {
        if (active) setLoadingItem(false);
      });

    return () => {
      active = false;
    };
  }, [id, navigate]);

  return (
    <div>
      <div className="dashboard-hero mb-4">
        <div>
          <p className="dashboard-hero__eyebrow mb-1">Case Studies</p>
          <h1 className="dashboard-hero__title mb-1">
            {isEdit ? "Edit Case Study" : "Create Case Study"}
          </h1>
          <p className="dashboard-hero__text mb-0">
            {isEdit ? "Update this case study" : "Add a new case study"}
          </p>
        </div>
        <Button type="button" variant="ghost" onClick={goBack}>
          Back
        </Button>
      </div>

      <div className="users-table-wrap p-4">
        {loadingItem ? (
          <p className="users-empty">Loading case study...</p>
        ) : (
          <CaseStudyFormFields
            key={item?._id || item?.id || "create"}
            item={item}
            onCancel={goBack}
          />
        )}
      </div>
    </div>
  );
}

export default CaseStudyForm;
