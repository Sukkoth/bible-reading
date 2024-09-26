import BackButton from "@/components/BackButton";
import CreateYourOwnPlan from "@/components/CreateYourOwnPlan";
import NewPlanItem from "@/components/NewPlanItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTemplates } from "@/react-query/queries";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { BiGlasses } from "react-icons/bi";

function CreatePlan() {
  const [showCreatePlanForm, setShowCreatePlanForm] = useState(false);
  const loadTemplates = useGetTemplates();

  return loadTemplates.isPending ? (
    <CreatePlanLoader />
  ) : (
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

function CreatePlanLoader() {
  return (
    <div>
      <Skeleton className='size-10' />
      <Skeleton className='h-12 w-full mt-4' />
      <Separator className='my-5' />
      <div className=''>
        <Skeleton className='w-1/2 h-10' />
      </div>
      <div className='space-y-2 mt-2'>
        <Skeleton className='w-full h-3' />
        <Skeleton className='w-full h-3' />
        <Skeleton className='w-full h-3' />
        <Skeleton className='w-1/2 h-3' />
      </div>
      <div className='space-y-3 mt-3'>
        <Skeleton className='h-36 w-full' />
        <Skeleton className='h-36 w-full' />
        <Skeleton className='h-36 w-full' />
      </div>
    </div>
  );
}

export default CreatePlan;
