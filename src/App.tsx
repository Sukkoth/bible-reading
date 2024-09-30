import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "@/routes";
import NotFound from "@/pages/NotFound";
import MainLayout from "@/components/Layouts/MainLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useGetUser } from "@/react-query/queries";
import { useAuth } from "@/Providers/AuthProvider";
import MainLoader from "@/components/Loaders/MainLoader";

function App() {
  const { data, isPending } = useGetUser();
  const { handleSetAuth } = useAuth();

  useEffect(() => {
    if (data && data.user) {
      handleSetAuth(data.user, data.profile);
    }
  }, [data, handleSetAuth]);

  if (isPending) {
    return <MainLoader />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='login' element={<AppRoutes.auth.login />} />
        <Route path='register' element={<AppRoutes.auth.register />} />
        <Route element={<AuthLayout />}>
          <Route path='/' element={<AppRoutes.home.index />} />
          <Route path='/plans'>
            <Route index element={<AppRoutes.plans.index />} />
            <Route path=':planId' element={<AppRoutes.plans.plan />} />
            <Route path='popular' element={<AppRoutes.plans.popular />} />
            <Route path='create' element={<AppRoutes.plans.createPlan />} />
            <Route
              path='create/schedule/:planId'
              element={<AppRoutes.plans.createSchedule />}
            />
          </Route>
          <Route
            path='/complete-profile'
            element={<AppRoutes.auth.completeProfile />}
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
