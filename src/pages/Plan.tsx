// import { useParams } from "react-router-dom";
import { plansData } from "@/data";
import CalendarStatItem from "@/components/CalendarStatItem";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoIosSend } from "react-icons/io";
import { FaHourglassEnd } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { BsCalendar4Week } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import PlanDetailItem from "@/components/PlanDetailItem";
import { TbCategory } from "react-icons/tb";
import PlanCalendarView from "@/components/PlanCalendarView";
import BackButton from "@/components/BackButton";

function Plan() {
  //   const { planId } = useParams();
  const startDate = new Date("9-14-2024");
  const endDate = new Date("9-16-2025");

  return (
    <div className=''>
      <BackButton />
      <div className='pt-5'>
        <h1 className='text-2xl xs:text-3xl'>Chronological Bible reading</h1>
      </div>
      <Card className='flex items-center flex-col mt-10 gap-3'>
        <CardHeader>
          <div className='w-28 xs:w-40'>
            <CalendarStatItem
              {...plansData[0]}
              strokeWidth={10}
              children={
                <h1 className='text-3xl font-bold'>
                  {`${
                    Math.round(
                      (plansData[0].progress / plansData[0].target) * 100
                    ) || 0
                  }%`}
                </h1>
              }
            />
          </div>
        </CardHeader>
        <CardContent className='overflow-hidden'>
          <div className='grid grid-cols-1  xxs:grid-cols-2 xs:grid-cols-3 gap-2'>
            {planDetail.map((detail) => (
              <PlanDetailItem {...detail} key={detail.header} />
            ))}
          </div>
          <Separator className='my-5' />

          <PlanCalendarView startDate={startDate} endDate={endDate} />
          <Separator className='my-5' />

          <div className='w-full'>
            <Button variant='destructive' size='lg' className='w-full'>
              Delete Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const planDetail = [
  {
    icon: <IoIosSend size={20} />,
    header: "Started",
    subText: "Nov, 2024",
  },
  {
    icon: <FaHourglassEnd size={20} />,
    header: "Ends",
    subText: "Dec, 2024",
  },
  {
    icon: <FiBookOpen size={20} />,
    header: "Per Session",
    subText: "5 Chapters",
  },
  {
    icon: <BsCalendar4Week size={20} />,
    header: " Per Week",
    subText: "5 Sessions",
  },
  {
    icon: <IoCheckmarkDoneOutline size={20} />,
    header: "Completed",
    subText: "70%",
  },
  {
    icon: <TbCategory size={20} />,
    header: "Type",
    subText: "Book",
  },
];

export default Plan;
