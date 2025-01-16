import { Button } from '@heroui/react';
import Link from 'next/link';
import { GitHub2, LinkedIn2 } from '@/assets/icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const range = 2025 + (currentYear > 2025 ? `-${currentYear}` : '');

  return (
    <footer className='mx-auto border-t border-neutral-200 bg-neutral-100 px-6 dark:border-neutral-800 dark:bg-zinc-950'>
      <div className='flex flex-col items-center justify-between py-3 sm:flex-row'>
        <div className='pb-1 text-sm sm:pb-0'>
          <span>&copy; {range} InvSys</span>
        </div>
        <div className='flex items-center gap-1'>
          <Link href='https://github.com/aviv-maman' target='_blank' referrerPolicy='no-referrer'>
            <Button
              aria-label='GitHub'
              variant='ghost'
              size='sm'
              isIconOnly
              className='size-8 hover:bg-neutral-300 dark:hover:bg-neutral-800'>
              <GitHub2 className='size-4' />
            </Button>
          </Link>
          <Link href='https://www.linkedin.com/in/aviv-maman-914a95223' target='_blank' referrerPolicy='no-referrer'>
            <Button
              aria-label='LinkedIn'
              variant='ghost'
              size='sm'
              isIconOnly
              className='size-8 hover:bg-neutral-300 dark:hover:bg-neutral-800'>
              <LinkedIn2 className='size-4 text-blue-600' />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
