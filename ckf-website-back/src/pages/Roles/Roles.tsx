import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteRole,
  getRole,
  getRoles,
  updateRoleStatus,
} from "../../services/roleService";
import { getApiMessage } from "../../utils/apiError";
import type { Role } from "../../types/role";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Confirm from "../../components/Confirm/Confirm";
import ActionMenu from "../../components/ActionMenu/ActionMenu";
import RoleForm from "./RoleForm";
import "../../assets/css/users.css";
import "../../assets/css/permission-select.css";

function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadRoles = useCallback(() => {
    setLoading(true);

    getRoles()
      .then((list) => {
        setRoles(list);
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
    loadRoles();
  }, [loadRoles]);

  const closeForm = () => {
    setShowForm(false);
    setEditingRole(null);
  };

  const handleEdit = async (role: Role) => {
    const id = role._id || role.id;
    if (!id) return;

    try {
      const fullRole = await getRole(id);
      setEditingRole(fullRole);
      setShowForm(true);
    } catch (err) {
      toast.error(getApiMessage(err));
    }
  };

  const handleStatus = async (role: Role) => {
    const id = role._id || role.id;
    if (!id) return;

    try {
      const result = await updateRoleStatus(id, { isActive: !role.isActive });
      toast.success(result.message || "Role status updated.");
      loadRoles();
    } catch (err) {
      toast.error(getApiMessage(err));
    }
  };

  const confirmDelete = async () => {
    const id = deletingRole?._id || deletingRole?.id;
    if (!id) return;

    try {
      setDeleting(true);
      const result = await deleteRole(id);
      toast.success(result.message || "Role deleted successfully.");
      setDeletingRole(null);
      loadRoles();
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
          <p className="dashboard-hero__eyebrow mb-1">Roles</p>
          <h1 className="dashboard-hero__title mb-1">All Roles</h1>
          <p className="dashboard-hero__text mb-0">
            Create roles and assign permissions.
          </p>
        </div>
        <div className="users-hero-actions">
          <div className="dashboard-hero__chip">
            <i className="bi bi-shield-check"></i>
            {loading ? "Loading" : `${roles.length} Roles`}
          </div>
          <Button
            type="button"
            onClick={() => {
              setEditingRole(null);
              setShowForm(true);
            }}
          >
            Create Role
          </Button>
        </div>
      </div>

      <div className="users-table-wrap">
        {loading ? (
          <p className="users-empty">Loading roles...</p>
        ) : error ? (
          <p className="users-empty">{error}</p>
        ) : roles.length === 0 ? (
          <p className="users-empty">No roles found.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Key</th>
                <th>Permissions</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => {
                const perms = role.permissions || [];
                const shown = perms.slice(0, 2);

                return (
                  <tr key={role._id || role.id || role.key}>
                    <td>
                      <p className="users-person__name">{role.name}</p>
                    </td>
                    <td>{role.key}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {shown.map((perm) => (
                          <span key={perm} className="ckf-perm-chip">
                            {perm}
                          </span>
                        ))}
                        {perms.length > 2 && (
                          <span className="ckf-perm-chip ckf-perm-chip--more">
                            +{perms.length - 2}
                          </span>
                        )}
                        {perms.length === 0 && "-"}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`users-status ${
                          role.isActive === false
                            ? "users-status--inactive"
                            : "users-status--active"
                        }`}
                      >
                        {role.isActive === false ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td>
                      {role.createdAt
                        ? new Date(role.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <ActionMenu
                        items={[
                          {
                            label: "Edit",
                            icon: "bi-pencil",
                            onClick: () => handleEdit(role),
                          },
                          {
                            label: role.isActive === false ? "Activate" : "Deactivate",
                            icon: "bi-toggle2-on",
                            onClick: () => handleStatus(role),
                          },
                          {
                            label: "Delete",
                            icon: "bi-trash",
                            danger: true,
                            onClick: () => setDeletingRole(role),
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

      <Modal
        open={showForm}
        title={editingRole ? "Edit Role" : "Create Role"}
        className="ckf-modal--lg"
        onClose={closeForm}
      >
        <RoleForm
          key={editingRole?._id || editingRole?.id || "create"}
          role={editingRole}
          onCancel={closeForm}
          onSuccess={() => {
            closeForm();
            loadRoles();
          }}
        />
      </Modal>

      <Confirm
        open={!!deletingRole}
        danger
        title="Delete Role"
        message={`Are you sure you want to delete ${deletingRole?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onClose={() => !deleting && setDeletingRole(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Roles;
