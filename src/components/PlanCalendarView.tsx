import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { addDays, differenceInDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { TbCalendarStats } from "react-icons/tb";

type Props = {
  startDate: Date;
  endDate: Date;
};
export default function PlanCalendarView({ startDate, endDate }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(
    differenceInDays(new Date(), startDate) || 0
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    api.scrollTo(current - 1); // Scroll to 4th (index is 0-based)

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, current]);

  const differenceInDate = differenceInDays(endDate, startDate);
  return (
    <div className='overflow-hidden w-[380px]'>
      <Carousel
        opts={{
          align: "start",
          containScroll: false,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {Array.from({ length: differenceInDate }).map((_, index) => (
            <CarouselItem key={index} className='basis-1/3'>
              <div className='p-1'>
                <Card
                  className={`shadow-none text-secondary-foreground ${
                    current === index ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <CardContent className='flex items-center justify-center p-6 flex-col'>
                    <TbCalendarStats size={20} />
                    <span className='text-sm pt-2 font-semibold'>
                      {format(addDays(startDate, index), "do")}
                    </span>
                    <span className='text-xs pt-1'>
                      {format(addDays(startDate, index), "MMMM")}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
