import { Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import { useEffect, useState } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import Home from "@/pages/Home";
import Plans from "@/pages/Plans";
import Plan from "@/pages/Plan";
import PopularPlans from "@/pages/NewPlan";
import CompleteProfile from "@/pages/CompleteProfile";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useGetUser } from "./react-query/queries";
import { useAuth } from "./Providers/AuthProvider";
import MainLoader from "./components/Loaders/MainLoader";
import CreatePlan from "./pages/CreatePlan";
import CreatePlanSchedule from "./pages/CreatePlanSchedule";

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
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
        <Route element={<AuthLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/plans'>
            <Route index element={<Plans />} />
            <Route path=':planId' element={<Plan />} />
            <Route path='popular' element={<PopularPlans />} />
            <Route path='create' element={<CreatePlan />} />
            <Route
              path='create/schedule/:planId'
              element={<CreatePlanSchedule />}
            />
          </Route>
          <Route path='/complete-profile' element={<CompleteProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
