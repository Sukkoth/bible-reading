import BackButton from "@/components/BackButton";
import CreateYourOwnPlan from "@/components/CreateYourOwnPlan";
import NewPlanItem from "@/components/NewPlanItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetTemplates } from "@/react-query/queries";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { BiGlasses } from "react-icons/bi";
import { AiOutlineAlert } from "react-icons/ai";
import CreatePlanLoader from "@/loaders/CreatePlanLoader";

function CreatePlan() {
  const [showCreatePlanForm, setShowCreatePlanForm] = useState(false);
  const loadTemplates = useGetTemplates();

  return loadTemplates.isPending ? (
    <CreatePlanLoader />
  ) : (
    <div>
      <BackButton />
      <div className='text-sm border p-3 rounded-md mt-5 text-stone-500 dark:text-stone-300 flex gap-8 items-center'>
        <div className='text-2xl animate-pulse text-primary'>
          <AiOutlineAlert />
        </div>
        <p>
          <strong className='text-primary'>Create a plan</strong> of your own or
          pick from the given{" "}
          <strong className='text-primary'>templates</strong>. Then you will
          move on to <strong className='text-primary'>create a schedule</strong>{" "}
          for your plan.
        </p>
      </div>
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
            <p className='text-sm pt-2 text-stone-500 dark:text-stone-300'>
              You can also pick from these pre made templates. These templates
              are made based on the most reading possibilities you can make on
              your own and if you can't find one, you can make your own.
            </p>

            <div>
              {loadTemplates.data?.map((template) => {
                // if template is ALL_IN_ONE
                const queryParam = `${template.plans.id}?type=${
                  template.schedules.listType
                }&perDay=${
                  template.schedules.perDay || 1
                }&books=${JSON.stringify(template.schedules.items)}`;

                return (
                  <NewPlanItem
                    queryParam={queryParam}
                    title={template.plans.name}
                    description={template.plans.description}
                    quantifier={template.schedules.perDay}
                    duration={template.plans.suggestedDuration}
                    key={template.id}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CreatePlan;
