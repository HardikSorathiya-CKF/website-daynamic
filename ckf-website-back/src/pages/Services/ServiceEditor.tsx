import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/Button/Button";
import LayoutEditor from "../../components/LayoutEditor/LayoutEditor";
import { getService, updateService } from "../../services/serviceService";
import { getApiMessage } from "../../utils/apiError";
import type { Service } from "../../types/service";
import "../../assets/css/users.css";
import "../../assets/css/layout-editor.css";

function ServiceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const contentRef = useRef("");

  const goBack = () => {
    if (id) navigate(`/services/${id}/edit`);
    else navigate("/services");
  };

  useEffect(() => {
    if (!id) {
      navigate("/services");
      return;
    }

    let active = true;

    getService(id)
      .then((data) => {
        if (!active) return;
        setItem(data);
        contentRef.current = data.content || "";
      })
      .catch((error) => {
        toast.error(getApiMessage(error));
        navigate("/services");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, navigate]);

  const saveContent = async () => {
    if (!id || !item) return;

    try {
      setSaving(true);
      const result = await updateService(id, {
        title: item.title,
        slug: item.slug,
        content: contentRef.current,
      });
      toast.success(result.message || "Page content saved successfully.");
    } catch (error) {
      toast.error(getApiMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ckf-editor-page">
      <div className="ckf-editor-bar">
        <div className="ckf-editor-bar__meta">
          <span className="ckf-editor-bar__icon">
            <i className="bi bi-columns-gap"></i>
          </span>
          <div>
            <p className="ckf-editor-bar__eyebrow">Page content editor</p>
            <h1 className="ckf-editor-bar__title">
              {item ? item.title : "Loading service"}
            </h1>
          </div>
        </div>
        <div className="ckf-editor-bar__actions">
          <Button type="button" variant="ghost" onClick={goBack}>
            Back
          </Button>
          <Button type="button" loading={saving} onClick={saveContent}>
            Save Content
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="users-empty">Loading editor...</p>
      ) : (
        <LayoutEditor
          value={item?.content || ""}
          onChange={(value) => {
            contentRef.current = value;
          }}
        />
      )}
    </div>
  );
}

export default ServiceEditor;
