import BackButton from "@/components/BackButton";
import PlansItem from "@/components/PlansItem";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPlans } from "@/react-query/queries";
import { useEffect, useState } from "react";

function Plans() {
  const plans = useGetPlans();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (navigator.setAppBadge) {
      // The API is supported, use it.
      console.log("Supported");
      navigator
        .setAppBadge(3)
        .then(() => setMessage("set it"))
        .catch((e) => setMessage("Could not set it"));
    } else {
      // The API is not supported, don't use it.
      console.log("Supported NOT");
    }
  }, []);

  if (plans.isPending) {
    return <PlansLoader />;
  }

  if (!plans.data) {
    return <h1>No plans found</h1>;
  }

  return (
    <div>
      <BackButton />
      <div className='pt-5'>
        <h1 className='text-sm xxs:text-xl xs:text-2xl'>Your Plans</h1>
        <span>{message}</span>
      </div>
      <div>
        {plans?.data?.map((plan, index) => {
          const completed = plan.schedules
            .map((schedule) => schedule.items)
            .flat(2)
            .filter((schedule) => schedule.status === "COMPLETED").length;

          return (
            <PlansItem
              to={`/plans/${plan.id}`}
              target={plan.totalChapters}
              progress={completed}
              type='chapters'
              text={plan?.plans?.name}
              subText={`${plan.totalChapters}  Chapters`}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

function PlansLoader() {
  return (
    <div>
      <Skeleton className='size-10' />
      <div className='pt-5'>
        <Skeleton className='w-1/3 h-12' />
      </div>
      <div className='pt-2'>
        <Skeleton className='my-3 h-14 rounded-xl dark:border' />
        <Skeleton className='my-3 h-14 rounded-xl dark:border' />
        <Skeleton className='my-3 h-14 rounded-xl dark:border' />
        <Skeleton className='my-3 h-14 rounded-xl dark:border' />
      </div>
    </div>
  );
}

export default Plans;
