import { useAuth } from "@/Providers/AuthProvider";
import {
  GET_PLAN_SCHEDULE,
  GET_PLANS,
  GET_TODAYS_PLANS,
  GET_USER,
} from "@/supabase/services";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: GET_USER,
  });
}

export function useGetPlanSchedule(scheduleId: number) {
  return useQuery({
    queryKey: ["planSchedule", scheduleId],
    queryFn: () => GET_PLAN_SCHEDULE(scheduleId),
    staleTime: 900_000,
  });
}

export function useGetPlans() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["plans", user?.id],
    queryFn: () => GET_PLANS(user!.id),
  });
}

export function useGetTodaysPlans() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["today'sPlans"],
    queryFn: () => GET_TODAYS_PLANS(user!.id),
  });
}
