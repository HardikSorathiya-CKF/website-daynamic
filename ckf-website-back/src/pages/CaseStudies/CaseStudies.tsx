import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteCaseStudy,
  getCaseStudies,
  updateCaseStudyStatus,
} from "../../services/caseStudyService";
import { getApiMessage } from "../../utils/apiError";
import type { CaseStudy } from "../../types/caseStudy";
import Button from "../../components/Button/Button";
import Confirm from "../../components/Confirm/Confirm";
import ActionMenu from "../../components/ActionMenu/ActionMenu";
import "../../assets/css/users.css";

const itemId = (item: CaseStudy) => item._id || item.id || "";

function CaseStudies() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<CaseStudy | null>(null);
  const [saving, setSaving] = useState(false);

  const loadItems = useCallback(() => {
    setLoading(true);

    getCaseStudies()
      .then((list) => {
        setItems(list);
        setError("");
      })
      .catch((err) => {
        const message = getApiMessage(err);
        setError(message);
        toast.error(message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleStatus = async (item: CaseStudy) => {
    const id = itemId(item);
    if (!id) return;

    try {
      const result = await updateCaseStudyStatus(id, { isActive: !item.isActive });
      toast.success(result.message || "Case study status updated.");
      loadItems();
    } catch (err) {
      toast.error(getApiMessage(err));
    }
  };

  const confirmDelete = async () => {
    const id = deleting ? itemId(deleting) : "";
    if (!id) return;

    try {
      setSaving(true);
      const result = await deleteCaseStudy(id);
      toast.success(result.message || "Case study deleted successfully.");
      setDeleting(null);
      loadItems();
    } catch (err) {
      toast.error(getApiMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="dashboard-hero mb-4">
        <div>
          <p className="dashboard-hero__eyebrow mb-1">Case Studies</p>
          <h1 className="dashboard-hero__title mb-1">All Case Studies</h1>
          <p className="dashboard-hero__text mb-0">
            Create and manage website case studies.
          </p>
        </div>
        <div className="users-hero-actions">
          <div className="dashboard-hero__chip">
            <i className="bi bi-journal-richtext"></i>
            {loading ? "Loading" : `${items.length} Case Studies`}
          </div>
          <Button type="button" onClick={() => navigate("/case-studies/create")}>
            Create Case Study
          </Button>
        </div>
      </div>

      <div className="users-table-wrap">
        {loading ? (
          <p className="users-empty">Loading case studies...</p>
        ) : error ? (
          <p className="users-empty">{error}</p>
        ) : items.length === 0 ? (
          <p className="users-empty">No case studies found.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const id = itemId(item);

                return (
                  <tr key={id || item.slug}>
                    <td>
                      <p className="users-person__name">{item.title}</p>
                    </td>
                    <td>{item.slug}</td>
                    <td>
                      <span
                        className={`users-status ${
                          item.isActive === false
                            ? "users-status--inactive"
                            : "users-status--active"
                        }`}
                      >
                        {item.isActive === false ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <ActionMenu
                        items={[
                          {
                            label: "Edit",
                            icon: "bi-pencil",
                            onClick: () => navigate(`/case-studies/${id}/edit`),
                          },
                          {
                            label: item.isActive === false ? "Activate" : "Deactivate",
                            icon: "bi-toggle2-on",
                            onClick: () => handleStatus(item),
                          },
                          {
                            label: "Delete",
                            icon: "bi-trash",
                            danger: true,
                            onClick: () => setDeleting(item),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <Confirm
        open={!!deleting}
        danger
        title="Delete Case Study"
        message={`Are you sure you want to delete ${deleting?.title}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={saving}
        onClose={() => !saving && setDeleting(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default CaseStudies;
