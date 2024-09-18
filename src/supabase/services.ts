import { LoginSchemaType } from "@/schemas/authSchema";
import supabase from ".";
import { CompleteProfileSchemaType } from "@/schemas/completeProfileSchema";
import { CreatePlanSchemaType } from "@/schemas/createPlanSchema";

export async function GET_USER() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error("Could not get user");
  }

  const profileData = await GET_PROFILE(data.user.id);
  return { user: data.user, profile: profileData };
}

export async function LOGOUT() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Could not logout");
  }
}

export async function LOGIN(formData: LoginSchemaType) {
  const { data, error: authError } = await supabase.auth.signInWithPassword(
    formData
  );
  if (authError) {
    throw new Error(authError.message || "Something went wrong");
  }

  const userId = data.user.id;
  const profileData = await GET_PROFILE(userId);
  return { user: data.user, profile: profileData };
}

export async function REGISTER(formData: LoginSchemaType) {
  const { data, error } = await supabase.auth.signUp(formData);
  if (error) {
    throw new Error(error.message || "Something went wrong");
  }
  return data;
}

async function GET_PROFILE(userId: string): Promise<Profile> {
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  return profileData;
}

export async function UPDATE_PROFILE(
  formData: CompleteProfileSchemaType,
  userId: string,
  profileId: number | undefined
) {
  const dataToUpdate = {
    id: profileId || undefined,
    first_name: formData.firstName,
    last_name: formData.lastName!.length > 0 ? formData.lastName : undefined,
    avatar: formData.avatar,
    gender: formData.gender,
    user_id: userId,
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(dataToUpdate)
    .select();

  console.log("UPSERT DATA", data, "Error", error);

  if (error || !data.length) {
    throw new Error(error?.message || "Something went wrong");
  }

  return data[0];
}

//* PLAN SERVICES
export async function CREATE_PLAN(
  formData: CreatePlanSchemaType,
  userId: string
) {
  const { data, error } = await supabase
    .from("plans")
    .insert({
      ...formData,
      createdBy: userId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Something went wrong");
  }

  return data;
}

export type CreatePlanSchedule = {
  planId: number;
  startDate: Date;
  endDate: Date;
  type?: string;
  schedules: {
    id: string;
    date: string;
    items: {
      status: string;
      goal: string;
      notes?: string;
    }[];
  }[];
};

export async function CREATE_PLAN_SCHEDULE(
  formData: CreatePlanSchedule,
  userId: string
) {
  const { data, error } = await supabase
    .from("userSchedule")
    .insert({ ...formData, userId })
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Something went wrong");
  }

  return data;
}

export async function GET_PLAN_SCHEDULE(scheduleId: number) {
  let { data, error } = await supabase
    .from("userSchedule")
    .select("*, plans(*)")
    .eq("id", scheduleId)
    .single();

  if (error) {
    throw new Error(error.message || "Something went wrong");
  }

  return data as UserPlan;
}
