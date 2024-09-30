import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CompleteProfileLoader() {
  return (
    <div className='flex flex-col h-full flex-grow items-center justify-center'>
      <Card className='w-full bg-transparent'>
        <CardHeader>
          <Skeleton className='h-14' />
          <Skeleton className='h-4 mt-3' />
        </CardHeader>
        <CardContent>
          <div>
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-12 mt-3' />
          </div>
          <div className='mt-5'>
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-12 mt-3' />
          </div>
          <div className='mt-5'>
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-12 mt-3' />
          </div>
          <div className='mt-5 flex justify-around gap-5'>
            <Skeleton className='h-12 w-28' />
            <Skeleton className='h-12 w-28' />
          </div>
          <Skeleton className='h-14 mt-5' />
        </CardContent>
      </Card>
    </div>
  );
}

export default CompleteProfileLoader;
