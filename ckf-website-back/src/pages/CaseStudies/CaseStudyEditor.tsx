import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/Button/Button";
import LayoutEditor from "../../components/LayoutEditor/LayoutEditor";
import { getCaseStudy, updateCaseStudy } from "../../services/caseStudyService";
import { getApiMessage } from "../../utils/apiError";
import type { CaseStudy } from "../../types/caseStudy";
import "../../assets/css/users.css";
import "../../assets/css/layout-editor.css";

function CaseStudyEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const contentRef = useRef("");

  const goBack = () => {
    if (id) navigate(`/case-studies/${id}/edit`);
    else navigate("/case-studies");
  };

  useEffect(() => {
    if (!id) {
      navigate("/case-studies");
      return;
    }

    let active = true;

    getCaseStudy(id)
      .then((data) => {
        if (!active) return;
        setItem(data);
        contentRef.current = data.description || "";
      })
      .catch((error) => {
        toast.error(getApiMessage(error));
        navigate("/case-studies");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, navigate]);

  const saveDescription = async () => {
    if (!id || !item) return;

    try {
      setSaving(true);
      const result = await updateCaseStudy(id, {
        title: item.title,
        description: contentRef.current,
      });
      toast.success(result.message || "Description saved successfully.");
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
            <p className="ckf-editor-bar__eyebrow">Description editor</p>
            <h1 className="ckf-editor-bar__title">
              {item ? item.title : "Loading case study"}
            </h1>
          </div>
        </div>
        <div className="ckf-editor-bar__actions">
          <Button type="button" variant="ghost" onClick={goBack}>
            Back
          </Button>
          <Button type="button" loading={saving} onClick={saveDescription}>
            Save Description
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="users-empty">Loading editor...</p>
      ) : (
        <LayoutEditor
          value={item?.description || ""}
          onChange={(value) => {
            contentRef.current = value;
          }}
        />
      )}
    </div>
  );
}

export default CaseStudyEditor;
