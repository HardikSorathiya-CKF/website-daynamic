function Dashboard() {
  return (
    <div>
      <div className="dashboard-hero mb-4">
        <div>
          <p className="dashboard-hero__eyebrow mb-1">Overview</p>
          <h1 className="dashboard-hero__title mb-1">Dashboard</h1>
          <p className="dashboard-hero__text mb-0">
            Welcome to CKF Admin Panel. Manage your content from here.
          </p>
        </div>
        <div className="dashboard-hero__chip">
          <i className="bi bi-lightning-charge-fill"></i>
          Live Admin
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="dashboard-card">
            <span className="dashboard-card__icon">
              <i className="bi bi-people"></i>
            </span>
            <h3>Admins</h3>
            <p>Create and manage admin users</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <span className="dashboard-card__icon dashboard-card__icon--orange">
              <i className="bi bi-shield-check"></i>
            </span>
            <h3>Secure</h3>
            <p>Protected routes with login access</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-card">
            <span className="dashboard-card__icon">
              <i className="bi bi-grid-1x2"></i>
            </span>
            <h3>Ready</h3>
            <p>Clean layout for next modules</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
