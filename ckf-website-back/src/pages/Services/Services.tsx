import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteService, getServices, updateServiceStatus } from "../../services/serviceService";
import { getApiMessage } from "../../utils/apiError";
import type { Service } from "../../types/service";
import Button from "../../components/Button/Button";
import Confirm from "../../components/Confirm/Confirm";
import ActionMenu from "../../components/ActionMenu/ActionMenu";
import "../../assets/css/users.css";

function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingService, setDeletingService] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadServices = useCallback(() => {
    setLoading(true);

    getServices()
      .then((list) => {
        setServices(list);
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
    loadServices();
  }, [loadServices]);

  const handleStatus = async (service: Service) => {
    const id = service._id || service.id;
    if (!id) return;

    try {
      const result = await updateServiceStatus(id, { isActive: !service.isActive });
      toast.success(result.message || "Service status updated.");
      loadServices();
    } catch (err) {
      toast.error(getApiMessage(err));
    }
  };

  const confirmDelete = async () => {
    const id = deletingService?._id || deletingService?.id;
    if (!id) return;

    try {
      setDeleting(true);
      const result = await deleteService(id);
      toast.success(result.message || "Service deleted successfully.");
      setDeletingService(null);
      loadServices();
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
          <p className="dashboard-hero__eyebrow mb-1">Services</p>
          <h1 className="dashboard-hero__title mb-1">All Services</h1>
          <p className="dashboard-hero__text mb-0">
            Create and manage website services.
          </p>
        </div>
        <div className="users-hero-actions">
          <div className="dashboard-hero__chip">
            <i className="bi bi-briefcase"></i>
            {loading ? "Loading" : `${services.length} Services`}
          </div>
          <Button type="button" onClick={() => navigate("/services/create")}>
            Create Service
          </Button>
        </div>
      </div>

      <div className="users-table-wrap">
        {loading ? (
          <p className="users-empty">Loading services...</p>
        ) : error ? (
          <p className="users-empty">{error}</p>
        ) : services.length === 0 ? (
          <p className="users-empty">No services found.</p>
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
              {services.map((service) => (
                <tr key={service._id || service.id || service.slug}>
                  <td>
                    <p className="users-person__name">{service.title}</p>
                  </td>
                  <td>{service.slug}</td>
                  <td>
                    <span
                      className={`users-status ${
                        service.isActive === false
                          ? "users-status--inactive"
                          : "users-status--active"
                      }`}
                    >
                      {service.isActive === false ? "Inactive" : "Active"}
                    </span>
                  </td>
                  <td>
                    {service.createdAt
                      ? new Date(service.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <ActionMenu
                      items={[
                        {
                          label: "Edit",
                          icon: "bi-pencil",
                          onClick: () =>
                            navigate(`/services/${service._id || service.id}/edit`),
                        },
                        {
                          label: service.isActive === false ? "Activate" : "Deactivate",
                          icon: "bi-toggle2-on",
                          onClick: () => handleStatus(service),
                        },
                        {
                          label: "Delete",
                          icon: "bi-trash",
                          danger: true,
                          onClick: () => setDeletingService(service),
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
        open={!!deletingService}
        danger
        title="Delete Service"
        message={`Are you sure you want to delete ${deletingService?.title}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onClose={() => !deleting && setDeletingService(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Services;
