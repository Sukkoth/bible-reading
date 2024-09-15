import { Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import { useEffect, useState } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import Home from "@/pages/Home";
import Plans from "@/pages/Plans";
import Plan from "@/pages/Plan";
import NewPlan from "@/pages/NewPlan";
import CompleteProfile from "@/pages/CompleteProfile";
import AuthLayout from "@/components/Layouts/AuthLayout";

function App() {
  const [theme] = useState("dark");
  // let handleTheme = ()=>{
  //   setTheme(theme === 'dark' ? "light":"dark")
  // }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
        <Route element={<AuthLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/plans' element={<Plans />} />
          <Route path='/plans/new' element={<NewPlan />} />
          <Route path='/plans/:planId' element={<Plan />} />
          <Route path='/complete-profile' element={<CompleteProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
