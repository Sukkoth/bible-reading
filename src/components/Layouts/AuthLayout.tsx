import { useGetUser } from "@/react-query/queries";
import { Navigate, Outlet } from "react-router-dom";
import MainLoader from "@/components/Loaders/MainLoader";
import { useAuth } from "@/Providers/AuthProvider";
import { useEffect } from "react";

function AuthLayout() {
  const { data, isError, isPending } = useGetUser();
  const { handleSetAuth } = useAuth();

  useEffect(() => {
    if (data && data.user && data.profile) {
      handleSetAuth(data.user, data.profile);
    }
  }, [data, handleSetAuth]);

  if (isPending) {
    return <MainLoader />;
  }

  if (isError || !data.user.id) {
    return <Navigate to='/login' />;
  }

  if (!data?.profile || !data.profile?.first_name) {
    return <Navigate to='/complete-profile' />;
  }

  return <Outlet />;
}

export default AuthLayout;
