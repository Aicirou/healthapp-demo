import { useAuth } from "../context/AuthContext";

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h2>Welcome, {user?.name}</h2>
      <p className="subtitle">Role: <strong>{user?.role}</strong></p>

      <div className="cards">
        <div className="card">
          <h3>Patients</h3>
          <p>Manage patient records and profiles.</p>
        </div>
        {(user?.role === "admin" || user?.role === "doctor") && (
          <div className="card">
            <h3>Doctors</h3>
            <p>View doctor profiles and availability.</p>
          </div>
        )}
        {user?.role === "admin" && (
          <div className="card">
            <h3>Users</h3>
            <p>Manage all system users and roles.</p>
          </div>
        )}
      </div>
    </div>
  );
}
