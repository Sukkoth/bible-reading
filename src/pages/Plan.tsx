import CalendarStatItem from "@/components/CalendarStatItem";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoIosSend } from "react-icons/io";
import { FaHourglassEnd } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { BsCalendar4Week } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import PlanDetailItem from "@/components/PlanDetailItem";
import { TbCategory } from "react-icons/tb";
import PlanCalendarView from "@/components/PlanCalendarView";
import BackButton from "@/components/BackButton";
import { useGetPlanSchedule } from "@/react-query/queries";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useCallback, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PlanLoader from "@/loaders/PlanLoader";

function Plan() {
  const [, setRenderOnPlanItemUpdate] = useState(false);
  const { planId } = useParams();

  const plan = useGetPlanSchedule(parseInt(planId!));

  const handleUpdatePlanItemStatus = useCallback(() => {
    //just rerender when schedule item's status is updated
    //needed this because the status is in child component
    //but progress showing component is in parent.
    //so trigger re-render by state update, to update the status count
    setRenderOnPlanItemUpdate((prev) => !prev);
  }, []);

  if (plan.isPending) {
    return <PlanLoader />;
  }

  if (!plan.isPending && !plan.data) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold mb-4'>No plan found</h1>
      </div>
    );
  }

  const { data } = plan;

  const target = data.totalChapters;

  const progress = data.schedules
    .map((schedule) => schedule.items)
    .flat(2)
    .filter((schedule) => schedule.status === "COMPLETED").length;

  const completedPercent = Math.round((progress / target) * 100) || 0;

  const planDetail = [
    {
      icon: <IoIosSend size={20} />,
      header: "Started",
      subText: format(data.startDate, "MMM d,y"),
    },
    {
      icon: <FaHourglassEnd size={20} />,
      header: "Ends",
      subText: format(data.endDate, "MMM d,y"),
    },
    {
      icon: <FiBookOpen size={20} />,
      header: "Per Session",
      subText: `${data.perDay}`,
    },
    {
      icon: <BsCalendar4Week size={20} />,
      header: "Per Week",
      subText: `${data.perDay * 7} Sessions `,
    },
    {
      icon: <IoCheckmarkDoneOutline size={20} />,
      header: "Completed",
      subText: `${completedPercent}%`,
    },
    {
      icon: <TbCategory size={20} />,
      header: "Type",
      subText: "Bible Book",
    },
  ];

  return (
    <div className=''>
      <BackButton />
      <div className='pt-5'>
        <h1 className='text-2xl xs:text-3xl'>{plan.data.plans.name}</h1>
      </div>
      <Card className='flex items-center flex-col mt-10 gap-3'>
        <CardHeader>
          <div className='w-28 xs:w-40'>
            <CalendarStatItem
              target={target}
              progress={progress}
              type='bible'
              strokeWidth={10}
              children={
                <h1 className='text-3xl font-bold'>{`${completedPercent}%`}</h1>
              }
            />
          </div>
        </CardHeader>
        <CardContent className='overflow-hidden px-3 sm:px-6'>
          <div className='grid grid-cols-1  xxs:grid-cols-2 xs:grid-cols-3 gap-2'>
            {planDetail.map((detail) => (
              <PlanDetailItem {...detail} key={detail.header} />
            ))}
          </div>
          <Separator className='my-5' />

          <PlanCalendarView
            schedules={data}
            onItemStatusUpdate={handleUpdatePlanItemStatus}
          />
          <Separator className='my-5' />

          <AlertDialog>
            <AlertDialogTrigger className='w-full'>
              <div className='w-full bg-destructive h-12 rounded-md px-8 flex items-center justify-center text-sm hover:bg-destructive/90'>
                Delete Plan
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  By continuing, you delete your{" "}
                  <strong className='text-red-500'>plan</strong> and it's
                  <strong className='text-red-500'> progress</strong>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {}}
                  className='bg-destructive hover:bg-destructive/90'
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}

export default Plan;
