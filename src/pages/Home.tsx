import { Button } from "@/components/ui/button";
import { BiGlasses } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import * as DATE_UTILS from "@/utils/date-utils";
import CalendarStatItem from "@/components/CalendarStatItem";
import PlansItem from "@/components/PlansItem";
import { Link, useNavigate } from "react-router-dom";
import { plansData } from "@/data";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='pt-5'>
        <h1 className='text-3xl'>Hello</h1>
        <h1 className='text-3xl'>Sukkoth👋</h1>
        <span className='text-xs'>{new Date().toDateString()}</span>
      </div>
      <div className='mt-5 space-y-2'>
        <Button
          size='default'
          className='w-full rounded-3xl py-5'
          onClick={() => navigate("plans/new")}
        >
          <CgAdd className='mr-2 h-4 w-4' /> New Plan
        </Button>
        <Button
          size='default'
          variant='outline'
          className='w-full rounded-3xl py-5'
        >
          <BiGlasses className='mr-2 h-4 w-4' /> Browse Popular Plans
        </Button>
      </div>
      <div className='mt-10'>
        <h1 className='text-2xl'>December, 2023</h1>
        <div className='grid grid-cols-8 gap-2 pt-3'>
          {Array.from(
            { length: DATE_UTILS.getDaysInCurrentMonth() },
            (_, i) => (
              <CalendarStatItem {...plansData[i]} text={i + 1} />
            )
          )}
        </div>
        <p className='pt-2'>
          <span className='text-primary'>+3.2%</span> from last month
        </p>
      </div>
      <div className='mt-10'>
        <div className='w-full flex justify-between items-center'>
          <h1 className='text-2xl'>Today's plans</h1>
          <Link
            to='plans'
            className='text-stone-400 text-xs hover:underline cursor-pointer'
          >
            View all
          </Link>
        </div>
        <PlansItem
          {...plansData[2]}
          text='Chronological Bible'
          subText='4 Chapters'
        />
        <PlansItem
          {...plansData[2]}
          text='Lutheran Difference'
          subText='20 Pages'
        />
        <PlansItem
          {...plansData[2]}
          text='Art of database design'
          subText='10 Pages'
        />
      </div>
    </div>
  );
}

export default Home;
