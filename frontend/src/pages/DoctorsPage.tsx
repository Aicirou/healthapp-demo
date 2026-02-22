import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Doctor } from "../types";

export function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<{ data: Doctor[] }>("/doctors")
      .then((res) => setDoctors(res.data.data))
      .catch((err) => setError(err.response?.data?.message ?? "Failed to load doctors"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="page">
      <h2>Doctors</h2>
      <p className="subtitle">{doctors.length} records</p>

      <table className="table">
        <thead>
          <tr>
            <th>License</th>
            <th>Specialization</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length === 0 ? (
            <tr><td colSpan={5} style={{ textAlign: "center" }}>No doctors found</td></tr>
          ) : (
            doctors.map((d) => (
              <tr key={d.id}>
                <td><code>{d.licenseNumber}</code></td>
                <td>{d.specialization}</td>
                <td>{d.department}</td>
                <td>{d.phone}</td>
                <td>
                  <span className={`badge ${d.isAvailable ? "badge-green" : "badge-red"}`}>
                    {d.isAvailable ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
