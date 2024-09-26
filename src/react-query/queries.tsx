import { useAuth } from "@/Providers/AuthProvider";
import {
  GET_CURRENT_MONTH_DAILY_PROGRESS,
  GET_PLAN_SCHEDULE,
  GET_PLANS,
  GET_TEMPLATES,
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
    staleTime: 43200,
  });
}

export function useGetTodaysPlans() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["today'sPlans"],
    queryFn: () => GET_TODAYS_PLANS(user!.id),
    staleTime: 43200, // 12 hours in seconds
  });
}

export function useGetTemplates() {
  return useQuery({
    queryFn: GET_TEMPLATES,
    queryKey: ["templates"],
    staleTime: 43200, // 12 hours in seconds
  });
}

export function useGetMonthlyPlanStats() {
  const { user } = useAuth();
  return useQuery({
    queryFn: () => GET_CURRENT_MONTH_DAILY_PROGRESS(user!.id),
    queryKey: ["month-stats"],
    staleTime: 43200,
  });
}
