import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Providers/AuthProvider";

function AuthLayout() {
  const { user } = useAuth();

  if (!user?.id) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}

export default AuthLayout;
