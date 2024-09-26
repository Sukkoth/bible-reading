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
    .select()
    .single();

  if (error || !data.length) {
    throw new Error(error?.message || "Something went wrong");
  }

  return data;
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
  totalChapters: number;
  totalBooks: number;
  perDay: number;
  type?: string;
  schedules: {
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
  const { schedules, ...otherData } = formData;
  const { data, error } = await supabase
    .from("userPlans")
    .insert({ ...otherData, userId })
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Something went wrong");
  }

  const { error: scheduleError } = await supabase.from("schedules").insert(
    schedules.map((schedule) => {
      return {
        ...schedule,
        userPlanId: data.id,
      };
    })
  );

  if (scheduleError) {
    throw new Error(scheduleError.message || "Something wenet wrong!");
  }

  return data;
}

export async function GET_PLAN_SCHEDULE(scheduleId: number) {
  const { data, error } = await supabase
    .from("userPlans")
    .select("*, plans(*), schedules(*)")
    .order("id", { referencedTable: "schedules" })
    .eq("id", scheduleId)
    .single();

  if (error) {
    throw new Error(error.message || "Something went wrong");
  }
  return data as UserPlan;
}

export async function GET_PLANS(userId: string) {
  const { data, error } = await supabase
    .from("userPlans")
    .select("*, plans(*), schedules(*)")
    .order("id", { referencedTable: "schedules" })
    .eq("userId", userId);
  if (error) {
    throw new Error(error.message || "Something went wrong");
  }

  return data as UserPlan[];
}

export type MarkPlanGoalData = {
  scheduleId: string;
  items: Schedule;
};

export async function UPDATE_SCHEDULE_ITEM_STATUS(formData: MarkPlanGoalData) {
  const { data, error } = await supabase
    .from("schedules")
    .update({ items: formData.items.items })
    .eq("id", formData.scheduleId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Something went wrong");
  }

  return data as Schedule;
}

export async function GET_TODAYS_PLANS(userId: string) {
  const { data, error } = await supabase
    .from("userPlans")
    .select("*, plans(*), schedules(*)")
    .eq("userId", userId)
    .eq("schedules.date", new Date().toISOString().split("T")[0]);

  if (error) {
    throw new Error(error.message || "Something went wrong");
  }

  return (data as UserPlan[])?.filter(
    (dataItem) => dataItem.schedules.length > 0
  );
}

//* TEMPLATES
export async function GET_TEMPLATES() {
  const { data, error } = await supabase
    .from("templates")
    .select("*, plans(*)");

  if (error) {
    throw new Error(error.message || "Something went wrong");
  }

  return data;
}
