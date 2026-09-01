import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      path: "/dashboard",
      label: "Feed",
      icon: "⌂",
    },
    {
      path: "/referrals",
      label: "Referrals",
      icon: "↗",
    },
    {
      path: "/notifications",
      label: "Notifications",
      icon: "●",
    },
    {
      path: "/search",
      label: "Find People",
      icon: "⌕",
    },
    {
      path: "/matches",
      label: "Skill Matches",
      icon: "✦",
    },
    {
      path: "/profile",
      label: "Profile",
      icon: "◎",
    },
  ];

  return (
    <div className="app-shell">

      {/* ==================== SIDEBAR ==================== */}

      <aside className="sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-mark">
            R
          </div>

          <div>
            <h2>ReferralHub</h2>
            <span>Professional Network</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">

          <p className="nav-section-title">
            MENU
          </p>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>
            </NavLink>
          ))}

        </nav>

        {/* Sidebar Bottom */}
        <div className="sidebar-bottom">

          <div className="sidebar-help">
            <span className="help-icon">?</span>

            <div>
              <strong>Need help?</strong>
              <span>Explore ReferralHub</span>
            </div>
          </div>

        </div>
      </aside>

      {/* ==================== MAIN AREA ==================== */}

      <div className="main-area">

        {/* ==================== TOPBAR ==================== */}

        <header className="topbar">

          <div className="topbar-left">
            <div className="mobile-logo">
              <div className="logo-mark">
                R
              </div>

              <strong>ReferralHub</strong>
            </div>
          </div>

          <div className="topbar-right">

            <div className="user-info">

              <div className="user-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="user-details">
                <strong>
                  {user?.name || "User"}
                </strong>

                <span>
                  {user?.role || "Member"}
                </span>
              </div>

            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </header>

        {/* ==================== PAGE CONTENT ==================== */}

        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;