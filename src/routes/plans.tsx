import { lazy } from "react";
import WithSuspense from "@/lib/WithSuspense";
import CreatePlanLoader  from "@/loaders/CreatePlanLoader";
import PlanLoader from "@/loaders/PlanLoader";
import PlansLoader from "@/loaders/PlansLoader";

const plansRoutes = {
  index: WithSuspense(
    lazy(() => import("@/pages/Plans")),
    <PlansLoader />
  ),
  createPlan: WithSuspense(
    lazy(() => import("@/pages/CreatePlan")),
    <CreatePlanLoader />
  ),
  createSchedule: WithSuspense(
    lazy(() => import("@/pages/CreatePlanSchedule")),
    <PlansLoader />
  ),
  plan: WithSuspense(
    lazy(() => import("@/pages/Plan")),
    <PlanLoader />
  ),
  popular: WithSuspense(
    lazy(() => import("@/pages/NewPlan")),
    <PlansLoader />
  ),
  //   new: WithSuspense(NewPlan, )
};

export default plansRoutes;
