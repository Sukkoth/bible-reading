declare type ScheduleStatus = "PENDING" | "COMPLETE" | "";
declare type PlanType = "BOOK" | "BIBLE";

declare interface Profile {
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  gender: string;
  avatar?: string;
  user_id: string;
}

declare interface Plan {
  id: number;
  name: string;
  description: string;
  userId?: number;
  converImg?: string;
  suggestedDuration: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

declare interface UserPlan {
  id: number;
  planId: number;
  userId: number;
  startDate: number;
  endDate: number;
  schedule: Schedule[];
  type: PlanType;
}

declare interface Schedule {
  id: number;
  date: Date;
  items: {
    status: ScheduleStatus;
    goal: string;
    completedAt?: Date;
    notes: string;
  }[];
}
