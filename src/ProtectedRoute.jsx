import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = true; // TEMP: allow access for now

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
