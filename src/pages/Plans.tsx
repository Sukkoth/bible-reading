import BackButton from "@/components/BackButton";
import PlansItem from "@/components/PlansItem";
import { useGetPlans } from "@/react-query/queries";

function Plans() {
  const plans = useGetPlans();

  if (plans.isPending) {
    return <h1>Loading . . .</h1>;
  }

  if (!plans.data) {
    return <h1>No plans found</h1>;
  }

  return (
    <div>
      <BackButton />
      <div className='pt-5'>
        <h1 className='text-3xl'>Your Plans</h1>
      </div>
      <div>
        {plans?.data?.map((plan, index) => {
          const completed = plan.schedules?.filter((schedule) =>
            schedule.items.every((item) => item.status === "COMPLETED")
          );

          return (
            <PlansItem
              to={`/plans/${plan.id}`}
              target={plan.totalChapters}
              progress={completed.length}
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

export default Plans;
