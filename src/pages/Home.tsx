import { Button } from "@/components/ui/button";
import { BiGlasses, BiMenu } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import * as DATE_UTILS from "@/utils/date-utils";
import CalendarStatItem from "@/components/CalendarStatItem";
import PlansItem from "@/components/PlansItem";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/Providers/AuthProvider";
import { useState } from "react";
import Drawer from "@/components/Drawer";
import {
  useGetMonthlyPlanStats,
  useGetTodaysPlans,
} from "@/react-query/queries";
import { format } from "date-fns";
import HomeLoader from "@/loaders/HomeLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function Home() {
  const navigate = useNavigate();
  const { profile, user } = useAuth();
  const [showDrawer, setShowDrawer] = useState(false);
  const todaysPlans = useGetTodaysPlans();
  const monthStats = useGetMonthlyPlanStats();
  const toBeMapped: { [key: string]: any } = {};
  let mapped = [];

  if (monthStats.data) {
    const data = monthStats.data.map((item) => item.schedules).flat(1);
    data.forEach((schedule) => {
      if (toBeMapped[schedule.date]) {
        toBeMapped[schedule.date].items = [
          ...toBeMapped[schedule.date].items,
          ...schedule.items,
        ];
      } else {
        toBeMapped[schedule.date] = {
          index: parseInt(schedule.date.split("-")[2]),
          date: schedule.date,
          items: schedule.items,
        };
      }
    });
    mapped = Object.values(toBeMapped);
  }

  return user?.id && (!profile || !profile?.first_name) ? (
    <Navigate to={"/complete-profile"} replace />
  ) : todaysPlans.isPending ? (
    <HomeLoader />
  ) : (
    <div className='relative overflow-hidden'>
      <Drawer show={showDrawer} onClose={() => setShowDrawer(false)} />
      <div
        className={`${
          showDrawer ? "opacity-50 blur-sm" : ""
        } transition-all duration-300`}
      >
        <div className='pt-5 flex justify-between'>
          <div>
            <h1 className='text-xl xxs:text-2xl xs:text-3xl'>Hello</h1>
            <h1 className='text-xl xxs:text-2xl xs:text-3xl'>
              {profile?.first_name?.split(" ")[0]}👋
            </h1>
            <span className='text-xs'>{new Date().toDateString()}</span>
          </div>
          <div
            className='text-primary hover:opacity-80 cursor-pointer'
            onClick={() => setShowDrawer(true)}
          >
            <BiMenu className='text-3xl' />
          </div>
        </div>
        <div className='mt-5 space-y-2'>
          <Button
            size='default'
            className='w-full rounded-3xl py-5'
            onClick={() => navigate("plans/popular")}
          >
            <BiGlasses className='mr-2 h-4 w-4' /> Browse Popular Plans
          </Button>
          <Button
            size='default'
            variant='outline'
            className='w-full rounded-3xl py-5'
            onClick={() => navigate("plans/create")}
          >
            <CgAdd className='mr-2 h-4 w-4' /> New Plan
          </Button>
        </div>
        <div className='mt-10'>
          <h1 className='text-sm xxs:text-xl xs:text-2xl'>
            {format(new Date(), "MMMM, y")}
          </h1>
          <div className='grid grid-cols-4 xxs:grid-cols-6 xs:grid-cols-8 gap-2 pt-3'>
            {Array.from(
              { length: DATE_UTILS.getDaysInCurrentMonth() },
              (_, index) => {
                const dailyData = mapped.filter(
                  (data) => data.index === index + 1
                );

                const target = dailyData?.[0]?.items?.length;
                const progress = dailyData?.[0]?.items?.filter(
                  (daily: ScheduleItem) => daily.status === "COMPLETED"
                ).length;
                return (
                  <CalendarStatItem
                    rangeColor
                    target={target}
                    progress={progress}
                    type='h'
                    text={index + 1}
                    key={index}
                  />
                );
              }
            )}
          </div>
          {/* <p className='pt-2'>
            <span className='text-primary'>+3.2%</span> from last month
          </p> */}
        </div>
        <div className='mt-10'>
          <div className='w-full flex justify-between items-center'>
            <h1 className='text-sm xxs:text-xl xs:text-2xl'>Today's plans</h1>

            <Link
              to='plans'
              className='text-stone-400 text-xs hover:underline cursor-pointer'
            >
              View all
            </Link>
          </div>
          {todaysPlans.data?.length ? (
            todaysPlans.data.map((plan) => {
              const target = plan.schedules[0].items.length;
              const progress = plan.schedules[0].items.filter(
                (item) => item.status === "COMPLETED"
              ).length;
              return (
                <PlansItem
                  key={plan.id}
                  target={target}
                  progress={progress}
                  type='Chapters'
                  text={plan.plans.name}
                  subText={`${progress}/${target} Chapters`}
                  to={`/plans/${plan.id}`}
                />
              );
            })
          ) : (
            <Alert className='mt-5 shadow-md'>
              <ExclamationTriangleIcon className='h-4 w-4 animate-pulse' />
              <AlertTitle className='font-bold'>No plans</AlertTitle>
              <AlertDescription>You got no plans for today</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
