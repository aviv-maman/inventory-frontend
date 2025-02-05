import Skeleton from '@/components/skeleton';
import { cn } from '@/lib/utils';

const ItemCardSkeleton: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <div id='card_root-item' className={cn('w-full border-none sm:max-w-5xl', props.className)} {...props}>
      <div className='flex flex-col gap-y-2 space-y-1.5 py-6'>
        <Skeleton className='h-7 sm:h-9' />
        <div className='flex items-center space-x-2 text-base'>
          <Skeleton className='size-10 rounded-full' />
          <div className='flex flex-col space-y-2'>
            <Skeleton className='h-5 w-28 rounded-md' />
            <Skeleton className='h-3 w-36 rounded-md' />
          </div>
        </div>
      </div>
      <div className='space-y-6 pb-6'>
        <Skeleton className='aspect-video size-full rounded-md' />
        <div className='flex flex-col gap-y-2'>
          <div className='flex w-full max-w-[70rem] gap-x-8 gap-y-2'>
            <Skeleton className='aspect-video size-full rounded-md' />
            <Skeleton className='hidden aspect-video size-full rounded-md min-[750px]:block' />
            <Skeleton className='hidden aspect-video size-full rounded-md min-[1200px]:block' />
          </div>
          <div className='flex w-full justify-between space-y-2'>
            <div className='flex gap-x-[0.6rem]'>
              <Skeleton className='size-8 rounded-full' />
              <Skeleton className='size-8 rounded-full' />
            </div>
            <div className='flex gap-x-4 pr-2'>
              <Skeleton className='size-4 rounded-full' />
              <Skeleton className='size-4 rounded-full' />
              <Skeleton className='size-4 rounded-full sm:hidden' />
              <Skeleton className='size-4 rounded-full sm:hidden' />
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-2'>
          <Skeleton className='h-6 rounded-md' />
          <Skeleton className='h-6 w-4/5 rounded-md' />
          <Skeleton className='h-6 w-11/12 rounded-md' />
          <Skeleton className='h-6 w-3/4 rounded-md' />
          <Skeleton className='h-6 w-5/6 rounded-md' />
        </div>
        <div className='flex flex-wrap gap-2'>
          {Array.from({ length: 3 }).map((tag, index) => (
            <Skeleton key={index} className='h-6 w-12' />
          ))}
        </div>
      </div>
      <div className='py-4'>
        <Skeleton className='h-4 w-52 rounded-md' />
      </div>
    </div>
  );
};

export default ItemCardSkeleton;
