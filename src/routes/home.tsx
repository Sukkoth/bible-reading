import WithSuspense from "@/lib/WithSuspense";
import HomeLoader from "@/loaders/HomeLoader";
import { lazy } from "react";

const homeRoutes = {
  index: WithSuspense(
    lazy(() => import("@/pages/Home")),
    <HomeLoader />
  ),
};

export default homeRoutes;
