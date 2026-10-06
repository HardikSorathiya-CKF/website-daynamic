import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../services/authService";
import { getApiMessage } from "../utils/apiError";
import {
  clearAuth,
  getRolePanelLabel,
  getUser,
  getUserAvatar,
} from "../utils/authStorage";
import type { User } from "../types/auth";
import "../assets/css/layout.css";
import "../assets/css/dashboard.css";

const menus = [
  { to: "/dashboard", label: "Dashboard", icon: "bi-speedometer2" },
  { to: "/users", label: "Users", icon: "bi-people" },
  { to: "/roles", label: "Roles", icon: "bi-shield-lock" },
  { to: "/pages", label: "Pages", icon: "bi-file-earmark-text" },
  { to: "/services", label: "Services", icon: "bi-briefcase" },
  { to: "/case-studies", label: "Case Studies", icon: "bi-journal-richtext" },
];

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 768);
  const [user] = useState<User | null>(() => getUser());
  const isEditor = /\/(case-studies|services)\/[^/]+\/editor$/.test(location.pathname);

  useEffect(() => {
    if (isEditor) setCollapsed(true);
  }, [isEditor]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error(getApiMessage(error));
    } finally {
      clearAuth();
      navigate("/login");
    }
  };

  return (
    <div
      className={`admin-layout ${collapsed ? "is-collapsed" : ""} ${isEditor ? "is-editor" : ""}`}
    >
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <img src="/logo.webp" alt="CKF" className="admin-sidebar__logo" />
        </div>

        <p className="admin-sidebar__label">Main menu</p>

        <nav className="admin-sidebar__nav">
          {menus.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `admin-sidebar__link ${isActive ? "is-active" : ""}`
              }
              title={item.label}
            >
              <span className="admin-sidebar__icon">
                <i className={`bi ${item.icon}`}></i>
              </span>
              <span className="admin-sidebar__text">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__badge" title={getRolePanelLabel(user?.role)}>
            <i className="bi bi-shield-check"></i>
            <span>{getRolePanelLabel(user?.role)}</span>
          </div>
        </div>
      </aside>

      {!collapsed && (
        <div
          className="admin-overlay d-md-none"
          onClick={() => setCollapsed(true)}
        />
      )}

      <div className="admin-main">
        <header className="admin-header">
          <button
            type="button"
            className="btn admin-header__toggle"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <i className="bi bi-list"></i>
          </button>

          <div className="admin-header__title d-none d-sm-block">
            <p className="admin-header__hello">Cloud Kode Form</p>
            <h2 className="admin-header__heading">Admin Workspace</h2>
          </div>

          <div className="dropdown ms-auto">
            <button
              type="button"
              className="btn admin-header__user"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={getUserAvatar(user)}
                alt={user?.name || "User"}
                className="admin-header__avatar"
              />
            </button>

            <ul className="dropdown-menu dropdown-menu-end admin-header__menu shadow-sm">
              <li>
                <Link className="dropdown-item" to="/profile">
                  <i className="bi bi-person me-2"></i>
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  type="button"
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </header>

        <main className="admin-content">
          <div className="admin-content__inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
