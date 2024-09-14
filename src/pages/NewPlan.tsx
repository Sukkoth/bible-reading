import BackButton from "@/components/BackButton";
import NewPlanItem from "@/components/NewPlanItem";
import { newPlansData } from "@/data";

function NewPlan() {
  return (
    <div>
      <BackButton />
      <div className='pt-5'>
        <h1 className='text-3xl'>New Plan</h1>
      </div>
      <div>
        {newPlansData.map((plan) => (
          <NewPlanItem {...plan} />
        ))}
      </div>
    </div>
  );
}

export default NewPlan;
