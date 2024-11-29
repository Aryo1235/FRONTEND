import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);

  return token ? <Outlet /> : <Navigate to="/login" />;
}
