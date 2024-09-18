import { Link } from "react-router-dom";
import CalendarStatItem from "./CalendarStatItem";
import { ChevronRight } from "lucide-react";

type Props = {
  type: "chapters" | "pages" | string;
  target: number;
  progress: number;
  text: string;
  subText: string;
  to: string;
};
function PlansItem({ target, progress, type, text, subText, to }: Props) {
  return (
    <Link
      to={to}
      className='border my-3 border-stone-700 hover:bg-secondary cursor-pointer px-2 py-2 rounded-xl flex items-center'
    >
      <div className='w-16 me-5 flex justify-center'>
        <CalendarStatItem
          {...{ target, progress, type }}
          text={`${Math.round((progress / target) * 100) || 0}%`}
          rangeColor
        />
      </div>
      <div className='flex items-center justify-between w-full pe-5'>
        <div>
          <h3>{text}</h3>
          <p className='text-xs text-stone-400 pt-1'>{subText}</p>
        </div>
        <div className='rounded-lg p-1'>
          <ChevronRight />
        </div>
      </div>
    </Link>
  );
}

export default PlansItem;
