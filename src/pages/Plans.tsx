import BackButton from "@/components/BackButton";
import PlansItem from "@/components/PlansItem";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PlansLoader from "@/loaders/PlansLoader";
import { useGetPlans } from "@/react-query/queries";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

function Plans() {
  const plans = useGetPlans();

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
        {!plans?.data?.length ? (
          <Alert className='mt-5 shadow-md'>
            <ExclamationTriangleIcon className='h-4 w-4 animate-pulse' />
            <AlertTitle className='font-bold'>No plans</AlertTitle>
            <AlertDescription>
              You got no plans yet. Try{" "}
              <strong className='text-primary underline'>
                <Link to={"/plans/create"}>creating</Link>
              </strong>{" "}
              one for yourself and{" "}
              <strong className='text-primary underline'>
                <Link to={"/plans/popular"}>select</Link>
              </strong>{" "}
              from the most popular ones
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Plans;
