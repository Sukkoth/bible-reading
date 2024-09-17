import { useAuth } from "@/Providers/AuthProvider";
import { LoginSchemaType } from "@/schemas/authSchema";
import { CompleteProfileSchemaType } from "@/schemas/completeProfileSchema";
import { CreatePlanSchemaType } from "@/schemas/createPlanSchema";
import {
  CREATE_PLAN,
  CREATE_PLAN_SCHEDULE,
  CreatePlanSchedule,
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_PROFILE,
} from "@/supabase/services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  return useMutation({
    mutationFn: LOGOUT,
    onSuccess: () => {
      location.pathname = "/login";
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const { handleSetUser, handleSetProfile } = useAuth();
  return useMutation({
    mutationFn: (formData: LoginSchemaType) => LOGIN(formData),
    mutationKey: ["auth"],
    onSuccess(data) {
      handleSetUser(data.user);
      handleSetProfile(data?.profile);
      navigate("/");
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: LoginSchemaType) => REGISTER(formData),
    mutationKey: ["auth"],
    onSuccess: () => {
      navigate("/");
    },
  });
}

export function useCompleteProfile() {
  const { user, handleSetProfile, profile } = useAuth();
  return useMutation({
    mutationFn: (formData: CompleteProfileSchemaType) =>
      UPDATE_PROFILE(formData, user!.id, profile?.id),
    onSuccess(data) {
      handleSetProfile(data);
      location.pathname = "/";
    },
  });
}

//* PLANS MUTATIONS
export function useCreatePlan() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (formData: CreatePlanSchemaType) =>
      CREATE_PLAN(formData, user!.id),
    mutationKey: ["create-plan"],
    onSuccess(data) {
      navigate(`/plans/create/schedule/${data.id}`, {
        replace: true,
      });
    },
  });
}

export function useCreatePlanSchedule() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (formData: CreatePlanSchedule) =>
      CREATE_PLAN_SCHEDULE(formData, user!.id),
    onSuccess(data) {
      navigate(`/plans/${data.id}`, {
        replace: true,
      });
    },
  });
}
