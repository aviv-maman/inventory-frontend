'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Reload } from '@/assets/icons';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const statusCode = 'statusCode' in error ? (error.statusCode as number) : 500;
  const statusText = 'statusText' in error ? (error.statusText as string) : error.name;

  return (
    <section className='flex size-full flex-col items-center justify-center'>
      <div className='fixed top-32 flex h-fit w-96 flex-col rounded-md border p-4 text-center sm:top-64 sm:w-[512px] sm:p-6'>
        <div>
          <h1 className='text-8xl font-black text-gray-400 dark:text-gray-200'>{statusCode}</h1>
          <span className='text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl'>Uh-oh!</span>
          <h2>{statusText}</h2>
          <span className='mt-4 text-gray-500'>{error.message}</span>
        </div>
        <div className='mt-6 flex items-center justify-center gap-x-3'>
          <button
            onClick={() => router.back()}
            className='flex items-center justify-center gap-x-2 rounded-lg border bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto'>
            <ArrowLeft className='size-4' />
            Go back
          </button>
          <Link
            href='/'
            className='flex items-center justify-center gap-x-2 rounded-lg border bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto'>
            <Home className='size-4' />
            Home
          </Link>
          <button
            onClick={() => reset()}
            className='flex items-center justify-center gap-x-2 rounded-lg border-1 border-blue-500 bg-blue-500 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto'>
            <Reload className='size-4' />
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
