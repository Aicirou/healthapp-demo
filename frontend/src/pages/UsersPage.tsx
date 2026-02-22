import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { User } from "../types";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<{ data: User[] }>("/users")
      .then((res) => setUsers(res.data.data))
      .catch((err) => setError(err.response?.data?.message ?? "Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="page">
      <h2>Users</h2>
      <p className="subtitle">{users.length} accounts</p>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className={`badge badge-${u.role}`}>{u.role}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
