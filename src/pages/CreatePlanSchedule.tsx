import BackButton from "@/components/BackButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import { books } from "@/assets/bible_books_list";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import PlanDetailItem from "@/components/PlanDetailItem";
import { BiBook } from "react-icons/bi";
import { IoIosSend, IoMdBook } from "react-icons/io";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  addDays,
  differenceInCalendarDays,
  differenceInCalendarYears,
  format,
  formatDuration,
  getYear,
  intervalToDuration,
} from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Minus, PlusIcon } from "lucide-react";
import { FaHourglassEnd } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { useCreatePlanSchedule } from "@/react-query/mutations";
import type { CreatePlanSchedule } from "@/supabase/services";

function CreatePlanSchedule() {
  const { planId } = useParams();
  const selectionRef = useRef<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [showTime, setShowTime] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [chapterCount, setChapterCount] = useState(1);

  const handleAddPlanToDb = useCreatePlanSchedule();

  function handleSelected() {
    console.log("SELECTED IN REF", selectionRef.current);
    setSelected(selectionRef.current);
    setShowTime(true);
  }

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const selectedBooksDetail = books.filter(({ book: bookName }) =>
    selected.includes(bookName)
  );

  const totalBooks = selectedBooksDetail.reduce(
    (acc, curr) => {
      return {
        books: acc.books + 1,
        chapters: acc.chapters + curr.chapters,
        verses: acc.verses + curr.verses,
      };
    },
    { chapters: 0, verses: 0, books: 0 }
  );

  // const totalBooks = {
  //   books: 66,
  //   chapters: 1189,
  //   verses: 31102,
  // };

  useEffect(() => {
    //whenever chapter count and startDay change, push back the end date
    if (startDate)
      setEndDate(
        addDays(
          startDate,
          Math.ceil(totalBooks.chapters / chapterCount) - 1 || 0
        )
      );
  }, [chapterCount, startDate]);

  function handleGenerateData() {
    //get books along with chapters
    const booksWithChapters = selected
      .map((selectedBook) => {
        const selectedBookDetail = books.filter(
          ({ book: bibleBook }) => bibleBook === selectedBook
        )[0];
        const mappedDatesAndChapters: {
          status: string;
          goal: string;
          notes: string;
        }[] = Array.from(
          { length: selectedBookDetail.chapters },
          (_, index) => {
            return {
              status: "PENDING",
              goal: `${selectedBookDetail.book} ${index + 1}`,
              notes: "",
            };
          }
        );
        return mappedDatesAndChapters;
      })
      .flat(2);

    // console.log(booksWithChapters);
    //distribute chapters on date
    let plan = [];

    for (let i = 0; i < booksWithChapters.length; i += chapterCount) {
      plan.push({
        id: uuidv4(),
        date: addDays(startDate!, i / chapterCount),
        items: booksWithChapters.slice(i, i + chapterCount),
      });
    }

    const finalDataToInsert: CreatePlanSchedule = {
      planId: parseInt(planId!),
      startDate: startDate!,
      endDate: endDate!,
      schedules: plan,
    };

    handleAddPlanToDb.mutate(finalDataToInsert);
  }

  return (
    <div className=''>
      <BackButton />
      <div className='pt-5'>
        <h1 className='text-2xl xs:text-3xl'>Create Schedule for {planId}</h1>
        <p className='text-sm'>* Select Books to read</p>
        <p className='text-sm'>
          * Books are added to list according to select order
        </p>
        {!showTime && (
          <div className='pt-5'>
            <h2 className='font-medium text-xl'>Old Testament</h2>
            {books.map((book, index) => (
              <div key={book.book}>
                {index === 39 && (
                  <h2 className='font-medium text-xl py-2'>New Testament</h2>
                )}
                <div className='py-3 px-3 flex gap-2 text-lg hover:bg-secondary'>
                  <Input
                    defaultChecked={selected.includes(book.book)}
                    type='checkbox'
                    id={book.book}
                    className='h-4 w-fit cursor-pointer'
                    onChange={(e) =>
                      e.target.checked
                        ? selectionRef.current.push(book.book)
                        : selectionRef.current.splice(
                            selectionRef.current.indexOf(book.book),
                            1
                          )
                    }
                  />
                  <Label
                    htmlFor={book.book}
                    className='cursor-pointer font-sans'
                  >
                    {book.book}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showTime && (
          <Button
            size={"lg"}
            className='w-full my-5'
            onClick={() => {
              handleSelected();
              setStartDate(new Date());
              setChapterCount(1);
            }}
          >
            Select Marked
          </Button>
        )}
        {showTime && (
          <div className='mt-10'>
            <div className='grid grid-cols-3 gap-3'>
              <PlanDetailItem
                header='Books'
                subText={`${totalBooks?.books}`}
                icon={<BiBook size={20} />}
              />
              <PlanDetailItem
                header='Chapters'
                subText={`${totalBooks.chapters}`}
                icon={<IoMdBook size={20} />}
              />
              <PlanDetailItem
                header='Verses'
                subText={`${totalBooks.verses}`}
                icon={<PiBookOpenTextDuotone size={20} />}
              />
            </div>
            <Card className='mt-10 px-2 '>
              <CardHeader className='text-xl'>
                Plan your reading schedule
                <CardDescription className='pt-2'>
                  You can select your start date (defaults to today) and your
                  end date. If you are not sure about the end, you can use the
                  counter to adjust how many chpaters you want to read per day
                  and the end date will calculated according to it.
                  <span className='block border px-2 py-3 rounded-sm mt-3'>
                    ⚠️ Minimim is 1 chapter a day
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-5'>
                  <div className='space-y-5'>
                    <div className='flex flex-col gap-2'>
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size={"lg"}
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {startDate ? (
                              format(startDate, "PPP")
                            ) : (
                              <span>Pick Start Date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            disabled={
                              (date) => date < addDays(new Date(), -1)
                              // date < addDays(startDate || new Date(), -1)
                            }
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className='flex justify-center'>
                    <div className='flex items-center gap-4'>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className='rounded-full size-10'
                        disabled={chapterCount === 1}
                        onClick={() => setChapterCount((prev) => prev - 1)}
                      >
                        <Minus />
                      </Button>
                      <div className=''>
                        <h1 className='text-5xl font-medium w-16 text-center'>
                          {chapterCount.toFixed(0)}
                        </h1>
                        <p className='text-[10px] text-secondary-foreground dark:text-stone-400 text-stone-700'>
                          {` chapter${chapterCount > 1 ? "s" : ""}/day`}
                        </p>
                      </div>

                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className='rounded-full size-10'
                        disabled={chapterCount === totalBooks.chapters}
                        onClick={() => setChapterCount((prev) => prev + 1)}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>
                  {/* <div className='flex flex-col gap-2'>
                    <Label>End Date</Label>
                    <div>
                      <Button
                        size={"lg"}
                        variant={"ghost"}
                        className={cn(
                          "w-full justify-start text-left font-normal cursor-default",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span>Pick Start Date</span>
                        )}
                      </Button>
                    </div>
                  </div> */}
                  {/**  */}
                  {/* <div className='text-sm'>
                    <p>
                      {startDate &&
                        endDate &&
                        totalBooks.chapters % chapterCount}{" "}
                      remainder
                    </p>
                    
                  </div> */}
                  {/*  */}
                </div>
                <div className='grid grid-cols-3 mt-5 gap-3'>
                  <PlanDetailItem
                    header='Per Day'
                    subText={`${chapterCount} Chapters`}
                    icon={<IoMdBook size={20} />}
                  />
                  {startDate && (
                    <PlanDetailItem
                      header='Starts'
                      subText={`${format(startDate, "MMM d,y")}`}
                      icon={<IoIosSend size={20} />}
                    />
                  )}
                  {endDate && (
                    <PlanDetailItem
                      header='Ends'
                      subText={`${format(endDate, "MMM d,y")}`}
                      icon={<FaHourglassEnd size={20} />}
                    />
                  )}
                </div>
                {startDate && endDate && (
                  <p className='text-center text-sm mt-5'>
                    You will finish this plan in{" "}
                    {formatDuration(
                      intervalToDuration({
                        start: addDays(startDate, -1),
                        end: endDate,
                      })
                    )}
                  </p>
                )}
              </CardContent>
            </Card>

            <Button
              size={"lg"}
              className='w-full my-5'
              variant={"outline"}
              onClick={() => setShowTime(false)}
            >
              Back to book selection
            </Button>
            <Button
              size={"lg"}
              disabled={handleAddPlanToDb.isPending}
              className='w-full'
              onClick={handleGenerateData}
            >
              {handleAddPlanToDb.isPending
                ? "Generating . . ."
                : "Generate Plan"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePlanSchedule;
