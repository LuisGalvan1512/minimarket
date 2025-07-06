// src/components/routes/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

export default function AdminRoute({ children }) {
  const { user, userData, loading } = useUserContext();

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  if (!user || userData?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
