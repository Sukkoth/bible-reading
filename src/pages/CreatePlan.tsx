import BackButton from "@/components/BackButton";
import CreateYourOwnPlan from "@/components/CreateYourOwnPlan";
import NewPlanItem from "@/components/NewPlanItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { newPlansData } from "@/data";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { BiGlasses } from "react-icons/bi";

function CreatePlan() {
  const [showCreatePlanForm, setShowCreatePlanForm] = useState(false);

  return (
    <div>
      <BackButton />
      <div className='pt-5'>
        <Button
          variant={!showCreatePlanForm ? "default" : "outline"}
          className='w-full'
          size='lg'
          onClick={() => setShowCreatePlanForm((prev) => !prev)}
        >
          {!showCreatePlanForm ? (
            <PlusIcon className='mr-2 h-4 w-4' />
          ) : (
            <BiGlasses className='mr-2 h-4 w-4' />
          )}{" "}
          {showCreatePlanForm ? "Pick from templates" : "Make your own"}
        </Button>
        <Separator className='my-5' />
        {showCreatePlanForm && <CreateYourOwnPlan />}

        {!showCreatePlanForm && (
          <>
            <h1 className='text-3xl'>Templates</h1>
            <p className='text-sm pt-2'>
              You can also pick from these pre made templates. These templates
              are made based on the most reading possibilities you can make on
              your own and if you can't find one, you can make your own
            </p>

            <div>
              {newPlansData.map((plan) => (
                <NewPlanItem {...plan} key={plan.title} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CreatePlan;
