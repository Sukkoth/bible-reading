import { useAuth } from "@/Providers/AuthProvider";
import { LoginSchemaType } from "@/schemas/authSchema";
import { CompleteProfileSchemaType } from "@/schemas/completeProfileSchema";
import { LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE } from "@/supabase/services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: LOGOUT,
    onSuccess: () => {
      navigate("/login");
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
  const { user, handleSetProfile } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: CompleteProfileSchemaType) =>
      UPDATE_PROFILE(formData, user!.id),
    onSuccess(data) {
      handleSetProfile(data);
      navigate("/");
    },
  });
}
