import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

function AuthLayout() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  //this is to stop the flickering login page until the state is set
  const authUserInCache = queryClient.getQueryState<{
    user: User;
    profile: Profile;
  }>(["authUser"]);

  if (
    !user?.id &&
    authUserInCache?.status !== "pending" &&
    !authUserInCache?.data?.user?.id
  ) {
    //no user in state, no user data in queryCache, then redirect to login
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}

export default AuthLayout;
