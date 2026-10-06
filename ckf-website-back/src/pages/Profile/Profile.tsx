import { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";
import { getUser, getUserAvatar, saveUser } from "../../utils/authStorage";
import type { User } from "../../types/auth";

function Profile() {
  const [admin, setAdmin] = useState<User | null>(() => getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getProfile()
      .then((res) => {
        if (!active) return;
        saveUser(res.admin);
        setAdmin(res.admin);
      })
      .catch(() => {
        // keep local data
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading && !admin) {
    return <p className="dashboard-hero__text mb-0">Loading profile...</p>;
  }

  if (!admin) {
    return <p className="dashboard-hero__text mb-0">No profile data found.</p>;
  }

  return (
    <div>
      <p className="dashboard-hero__eyebrow mb-1">Account</p>
      <h1 className="dashboard-hero__title mb-4">Profile</h1>

      <div className="d-flex align-items-center gap-3 mb-4">
        <img
          src={getUserAvatar(admin)}
          alt={admin.name}
          className="rounded-circle"
          width={72}
          height={72}
        />
        <div>
          <h2 className="h5 fw-bold text-primary mb-1">{admin.name}</h2>
          <p className="mb-0 text-secondary text-capitalize">{admin.role}</p>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="dashboard-card">
            <h3>Email</h3>
            <p>{admin.email}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card">
            <h3>Phone</h3>
            <p>{admin.phone || "-"}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card">
            <h3>Role</h3>
            <p className="text-capitalize">{admin.role}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card">
            <h3>Status</h3>
            <p>{admin.isActive ? "Active" : "Inactive"}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card">
            <h3>Last Login</h3>
            <p>
              {admin.lastLogin
                ? new Date(admin.lastLogin).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card">
            <h3>Joined</h3>
            <p>
              {admin.createdAt
                ? new Date(admin.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
