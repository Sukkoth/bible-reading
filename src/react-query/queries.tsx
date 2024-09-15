import { GET_USER } from "@/supabase/services";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: GET_USER,
  });
}
