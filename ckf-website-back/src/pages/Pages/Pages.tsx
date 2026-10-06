import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePage, getPages, updatePageStatus } from "../../services/pageService";
import { getApiMessage } from "../../utils/apiError";
import type { Page } from "../../types/page";
import Button from "../../components/Button/Button";
import Confirm from "../../components/Confirm/Confirm";
import ActionMenu from "../../components/ActionMenu/ActionMenu";
import "../../assets/css/users.css";

function Pages() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingPage, setDeletingPage] = useState<Page | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadPages = useCallback(() => {
    setLoading(true);

    getPages()
      .then((list) => {
        setPages(list);
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
    loadPages();
  }, [loadPages]);

  const handleStatus = async (page: Page) => {
    const id = page._id || page.id;
    if (!id) return;

    try {
      const result = await updatePageStatus(id, { isActive: !page.isActive });
      toast.success(result.message || "Page status updated.");
      loadPages();
    } catch (err) {
      toast.error(getApiMessage(err));
    }
  };

  const confirmDelete = async () => {
    const id = deletingPage?._id || deletingPage?.id;
    if (!id) return;

    try {
      setDeleting(true);
      const result = await deletePage(id);
      toast.success(result.message || "Page deleted successfully.");
      setDeletingPage(null);
      loadPages();
    } catch (err) {
      toast.error(getApiMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="dashboard-hero mb-4">
        <div>
          <p className="dashboard-hero__eyebrow mb-1">Pages</p>
          <h1 className="dashboard-hero__title mb-1">All Pages</h1>
          <p className="dashboard-hero__text mb-0">
            Create and manage website pages.
          </p>
        </div>
        <div className="users-hero-actions">
          <div className="dashboard-hero__chip">
            <i className="bi bi-file-earmark-text"></i>
            {loading ? "Loading" : `${pages.length} Pages`}
          </div>
          <Button type="button" onClick={() => navigate("/pages/create")}>
            Create Page
          </Button>
        </div>
      </div>

      <div className="users-table-wrap">
        {loading ? (
          <p className="users-empty">Loading pages...</p>
        ) : error ? (
          <p className="users-empty">{error}</p>
        ) : pages.length === 0 ? (
          <p className="users-empty">No pages found.</p>
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
              {pages.map((page) => (
                <tr key={page._id || page.id || page.slug}>
                  <td>
                    <p className="users-person__name">{page.title}</p>
                  </td>
                  <td>{page.slug}</td>
                  <td>
                    <span
                      className={`users-status ${
                        page.isActive === false
                          ? "users-status--inactive"
                          : "users-status--active"
                      }`}
                    >
                      {page.isActive === false ? "Inactive" : "Active"}
                    </span>
                  </td>
                  <td>
                    {page.createdAt
                      ? new Date(page.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <ActionMenu
                      items={[
                        {
                          label: "Edit",
                          icon: "bi-pencil",
                          onClick: () =>
                            navigate(`/pages/${page._id || page.id}/edit`),
                        },
                        {
                          label: page.isActive === false ? "Activate" : "Deactivate",
                          icon: "bi-toggle2-on",
                          onClick: () => handleStatus(page),
                        },
                        {
                          label: "Delete",
                          icon: "bi-trash",
                          danger: true,
                          onClick: () => setDeletingPage(page),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Confirm
        open={!!deletingPage}
        danger
        title="Delete Page"
        message={`Are you sure you want to delete ${deletingPage?.title}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onClose={() => !deleting && setDeletingPage(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Pages;
