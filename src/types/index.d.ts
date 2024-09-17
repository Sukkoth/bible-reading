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

// declare interface Plan {
//   id: number;
//   name: string;
//   description: string;
//   createdBy?: number; //default is null (admin)
//   coverImg?: string;
//   suggestedDuration: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// declare interface UserPlan {
//   id: number;
//   planId: number;
//   userId: number;
//   status: string; //started / completed
//   startDate: number; //null if !status
//   endDate: number; //null if !status
//   schedule: Schedule[];
//   type: PlanType;
// }

// declare interface Schedule {
//   id: number;
//   date: Date;
//   items: {
//     status: ScheduleStatus;
//     goal: string;
//     completedAt?: Date;
//     notes: string;
//   }[];
// }

// Plan interface
declare interface Plan {
  id: number;
  name: string;
  description: string;
  createdBy?: string | null; // null if created by admin
  coverImg?: string | null;
  suggestedDuration: number;
  created_at: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

// Schedule Item interface
interface ScheduleItem {
  goal: string;
  notes: string;
  status: "PENDING" | "COMPLETED"; // Assuming these are the possible statuses
  completedAt?: string; // Optional in case status is completed
}

// Schedule interface
interface Schedule {
  id: string;
  date: string; // ISO Date string
  items: ScheduleItem[];
}

// UserPlan interface
interface UserPlan {
  id: number;
  planId: number;
  userId: string; // UUID string
  startDate: string; // ISO Date string
  endDate: string; // ISO Date string
  type?: string | null; // Can be null or string depending on the use case
  schedules: Schedule[];
  plans: Plan; // Linked Plan data
}
