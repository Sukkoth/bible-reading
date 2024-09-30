import { lazy } from "react";
import WithSuspense from "@/lib/WithSuspense";

import AuthLoader from "@/loaders/AuthLoader";
import CompleteProfileLoader from "@/loaders/CompleteProfileLoader";

export const Login = WithSuspense(
  lazy(() => import("@/pages/Login")),
  <AuthLoader />
);
export const Register = WithSuspense(
  lazy(() => import("@/pages/Register")),
  <AuthLoader />
);

export const CompleteProfile = WithSuspense(
  lazy(() => import("@/pages/CompleteProfile")),
  <CompleteProfileLoader />
);

const AuthRoutes = {
  login: Login,
  register: Register,
  completeProfile: CompleteProfile,
};

export default AuthRoutes;
