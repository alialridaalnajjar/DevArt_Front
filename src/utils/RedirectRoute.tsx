// src/components/RedirectRoute.tsx (Refactored)
import { Navigate, Outlet } from "react-router-dom";
import useAuthCookies from "../utils/UseAuth";

export default function RedirectRoute() {
  const { isAuthenticated } = useAuthCookies();

  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" replace />;
}
