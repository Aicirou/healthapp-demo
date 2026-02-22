import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>HealthApp</h1>
          <span className="role-badge">{user?.role}</span>
        </div>

        <nav>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Dashboard
          </NavLink>
          <NavLink to="/patients" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Patients
          </NavLink>
          {(user?.role === "admin" || user?.role === "doctor") && (
            <NavLink to="/doctors" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Doctors
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Users
            </NavLink>
          )}
        </nav>

        <div className="sidebar-footer">
          <span className="user-name">{user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
