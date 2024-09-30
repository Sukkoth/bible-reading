import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoader() {
  return (
    <div>
      <div className='flex justify-between mt-5'>
        <div className='w-full'>
          <Skeleton className='w-1/2 h-20' />
          <Skeleton className='w-1/2 h-2 mt-1' />
        </div>
        <div>
          <Skeleton className='size-10' />
        </div>
      </div>
      <div className='mt-5 space-y-2'>
        <Skeleton className='w-full h-10 rounded-3xl' />
        <Skeleton className='w-full h-10 rounded-3xl' />
      </div>
      <div className='mt-12'>
        <Skeleton className='w-1/2 h-8' />
        <div className='grid grid-cols-4 xxs:grid-cols-6 xs:grid-cols-8 gap-2 pt-2'>
          {Array.from({ length: 30 }, (_, index) => (
            <Skeleton
              className='size-[45px] sm:size-[53px] rounded-full'
              key={index}
            />
          ))}
        </div>
      </div>
      <div className='mt-12'>
        <div className='pt-2 flex justify-between items-end'>
          <Skeleton className='w-1/3 h-8' />
          <Skeleton className='w-20 h-5 mt-3' />
        </div>
        <div className=''>
          <Skeleton className='my-3 h-16 rounded-xl border' />
          <Skeleton className='my-3 h-16 rounded-xl border' />
        </div>
      </div>
    </div>
  );
}
