import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { addDays, differenceInCalendarDays, format, isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import { TbCalendarStats } from "react-icons/tb";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  startDate: Date;
  endDate: Date;
};
export default function PlanCalendarView({ startDate, endDate }: Props) {
  const today = new Date();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(
    differenceInCalendarDays(today, startDate)
  );
  const [selectedDate, setSelectedDate] = useState(current);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.scrollTo(current); // Scroll to 4th (index is 0-based)

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, current]);

  useEffect(() => {
    setCurrent(selectedDate);
  }, [selectedDate]);

  const differenceBetweenStartToEnd = differenceInCalendarDays(
    endDate,
    startDate
  );
  return (
    <div className='overflow-hidden'>
      <Carousel
        opts={{
          align: "start",
          containScroll: false,
        }}
        setApi={setApi}
      >
        <CarouselContent className='ml-1 w-[150px] xs:w-[280px]'>
          {Array.from({ length: differenceBetweenStartToEnd }).map(
            (_, index) => {
              const calculatedDate = addDays(startDate, index);
              return (
                <CarouselItem
                  key={index}
                  className={`basis-full xxs:basis-1/2 xs:basis-1/3 cursor-pointer border pl-0 dark:hover:border-white hover:border-stone-900 transition-all duration-300 ${
                    selectedDate === index
                      ? "border-stone-900 dark:border-white"
                      : "border-secondary dark:border-stone-700 border-stone-200"
                  }`}
                  onClick={() => {
                    setSelectedDate(index);
                  }}
                >
                  <Card
                    className={`rounded-none shadow-none text-secondary-foreground  ${
                      isSameDay(calculatedDate, today)
                        ? `bg-primary hover:bg-primary/90`
                        : `bg-secondary`
                    } border-none`}
                  >
                    <CardContent className='flex items-center justify-center p-6 flex-col'>
                      <TbCalendarStats size={20} />
                      <span className='text-sm pt-2 font-semibold'>
                        {format(calculatedDate, "do")}
                      </span>
                      <span className='text-xs pt-1'>
                        {format(calculatedDate, "MMMM")}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            }
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Separator className='my-5' />
      <div className='space-y-2'>
        <CalendarViewItem />
        <CalendarViewItem />
        <CalendarViewItem />
        <CalendarViewItem />
      </div>
    </div>
  );
}

function CalendarViewItem() {
  return (
    <div className='flex gap-2 items-center'>
      <Input
        id='completed'
        type='checkbox'
        className='size-4 checked:bg-primary'
      />
      <Label htmlFor='completed' className='text-sm'>
        Page 1-10
      </Label>
    </div>
  );
}
