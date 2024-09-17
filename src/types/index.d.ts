declare type ScheduleStatus = "PENDING" | "COMPLETE" | "";
declare type PlanType = "BOOK" | "BIBLE";

declare interface Profile {
  id: number;
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
  createdBy?: number; //default is null (admin)
  coverImg?: string;
  suggestedDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

declare interface UserPlan {
  id: number;
  planId: number;
  userId: number;
  status: string; //started / completed
  startDate: number; //null if !status
  endDate: number; //null if !status
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
