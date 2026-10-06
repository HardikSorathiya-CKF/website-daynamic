import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteUser, getUsers } from "../../services/userService";
import { getApiMessage } from "../../utils/apiError";
import type { User } from "../../types/user";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Confirm from "../../components/Confirm/Confirm";
import ActionMenu from "../../components/ActionMenu/ActionMenu";
import UserForm from "./UserForm";
import "../../assets/css/users.css";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadUsers = useCallback(() => {
    setLoading(true);

    getUsers()
      .then((list) => {
        setUsers(list);
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
    loadUsers();
  }, [loadUsers]);

  const closeForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (user: User) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    const id = deletingUser?._id || deletingUser?.id;
    if (!id) return;

    try {
      setDeleting(true);
      const result = await deleteUser(id);
      toast.success(result.message || "User deleted successfully.");
      setDeletingUser(null);
      loadUsers();
    } catch (err) {
      toast.error(getApiMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const getAvatar = (user: User) => {
    if (user.avatar) return user.avatar;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=062d67&color=fff`;
  };

  return (
    <div>
      <div className="dashboard-hero mb-4">
        <div>
          <p className="dashboard-hero__eyebrow mb-1">Users</p>
          <h1 className="dashboard-hero__title mb-1">All Users</h1>
          <p className="dashboard-hero__text mb-0">
            View every user registered on the platform.
          </p>
        </div>
        <div className="users-hero-actions">
          <div className="dashboard-hero__chip">
            <i className="bi bi-people-fill"></i>
            {loading ? "Loading" : `${users.length} Users`}
          </div>
          <Button
            type="button"
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
          >
            Create User
          </Button>
        </div>
      </div>

      <div className="users-table-wrap">
        {loading ? (
          <p className="users-empty">Loading users...</p>
        ) : error ? (
          <p className="users-empty">{error}</p>
        ) : users.length === 0 ? (
          <p className="users-empty">No users found.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || user.email}>
                  <td>
                    <div className="users-person">
                      <img
                        className="users-person__avatar"
                        src={getAvatar(user)}
                        alt={user.name}
                      />
                      <p className="users-person__name">{user.name}</p>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone || "-"}</td>
                  <td className="text-capitalize">{user.role || "-"}</td>
                  <td>
                    <span
                      className={`users-status ${
                        user.isActive === false
                          ? "users-status--inactive"
                          : "users-status--active"
                      }`}
                    >
                      {user.isActive === false ? "Inactive" : "Active"}
                    </span>
                  </td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <ActionMenu
                      items={[
                        {
                          label: "Edit",
                          icon: "bi-pencil",
                          onClick: () => handleEdit(user),
                        },
                        {
                          label: "Delete",
                          icon: "bi-trash",
                          danger: true,
                          onClick: () => handleDelete(user),
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

      <Modal
        open={showForm}
        title={editingUser ? "Edit User" : "Create User"}
        onClose={closeForm}
      >
        <UserForm
          key={editingUser?._id || editingUser?.id || "create"}
          user={editingUser}
          onCancel={closeForm}
          onSuccess={() => {
            closeForm();
            loadUsers();
          }}
        />
      </Modal>

      <Confirm
        open={!!deletingUser}
        danger
        title="Delete User"
        message={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onClose={() => !deleting && setDeletingUser(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Users;
