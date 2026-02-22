import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Patient } from "../types";

export function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<{ data: Patient[] }>("/patients")
      .then((res) => setPatients(res.data.data))
      .catch((err) => setError(err.response?.data?.message ?? "Failed to load patients"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="page">
      <h2>Patients</h2>
      <p className="subtitle">{patients.length} records</p>

      <table className="table">
        <thead>
          <tr>
            <th>MRN</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Registered</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: "center" }}>No patients found</td></tr>
          ) : (
            patients.map((p) => (
              <tr key={p.id}>
                <td><code>{p.medicalRecordNumber}</code></td>
                <td>{p.dateOfBirth}</td>
                <td>{p.gender}</td>
                <td>{p.phone}</td>
                <td>{p.address ?? "—"}</td>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
