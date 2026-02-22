import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { User } from "../types";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  roles?: User["role"][];
}

export function ProtectedRoute({ children, roles }: Props) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (roles && user && !roles.includes(user.role)) {
    return (
      <div className="error-page">
        <h2>Access Denied</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
