// src/components/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";



export default function PrivateRoute({ children }) {
  const { user, loading } = useUserContext();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
