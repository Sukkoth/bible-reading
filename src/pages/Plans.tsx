import BackButton from "@/components/BackButton";
import PlansItem from "@/components/PlansItem";
import PlansLoader from "@/loaders/PlansLoader";
import { useGetPlans } from "@/react-query/queries";

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
      </div>
    </div>
  );
}

export default Plans;
