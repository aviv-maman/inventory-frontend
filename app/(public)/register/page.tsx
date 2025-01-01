import Link from 'next/link';
import { Affiliate } from '@/assets/icons';
import { RegisterForm } from '@/components/RegisterForm';

export default function Page() {
  return (
    <main className='flex min-h-[calc(100vh-162px)] justify-center animate-in sm:min-h-[calc(100vh-154px)]'>
      <div className='m-4 flex w-full px-2 pt-16 lg:w-2/6'>
        <div className='flex-1'>
          <div className='text-center'>
            <div className='mx-auto flex items-center justify-center'>
              <Affiliate className='mr-2 size-8' />
              <h1 className='text-3xl font-bold'>InvSys</h1>
            </div>
            <p className='mt-1 text-gray-500 dark:text-gray-400'>Create an account to get started</p>
          </div>
          <div className='mt-8 rounded-lg border p-2 shadow-sm'>
            <RegisterForm />
            <p className='mt-6 text-center text-sm text-gray-400'>
              Already have an account?{' '}
              <Link className='text-blue-500 hover:underline focus:underline focus:outline-none' href='/login'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
