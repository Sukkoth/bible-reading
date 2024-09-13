import PlansItem from "@/components/PlansItem";
import { plansData } from "@/data";

function Plans() {
  return (
    <div>
      <div className='pt-5'>
        <h1 className='text-3xl'>Your Plans</h1>
      </div>
      <div>
        <PlansItem
          {...plansData[2]}
          text='Chronological Bible'
          subText='4 Chapters'
        />
        <PlansItem
          {...plansData[6]}
          text='New Testament Survey'
          subText='2 Chapters'
        />
        <PlansItem
          {...plansData[3]}
          text='Psamls: In 80 days'
          subText='5 Chapters'
        />
        <PlansItem
          {...plansData[9]}
          text='Throught The Bible'
          subText='5 Chapters'
        />
        <PlansItem
          {...plansData[8]}
          text='Lutheran Difference'
          subText='25 Pages'
        />
      </div>
    </div>
  );
}

export default Plans;
