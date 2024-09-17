import { GET_PLAN_SCHEDULE, GET_USER } from "@/supabase/services";
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
  });
}
