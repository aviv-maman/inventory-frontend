'use server';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Affiliate } from '@/assets/icons';
import { RegisterForm } from '@/components/RegisterForm';
import { verifySession } from '@/lib/auth/requests';

export default async function RegisterPage() {
  const { user } = await verifySession();
  if (user) redirect('/');

  return (
    <section className='flex size-full flex-col items-center justify-center'>
      <div className='fixed top-32 flex w-96 flex-col rounded-md border p-6 sm:top-64'>
        <div className='text-center'>
          <div className='mx-auto flex items-center justify-center'>
            <Affiliate className='mr-2 size-8' />
            <h1 className='text-3xl font-bold'>InvSys</h1>
          </div>
          <p className='mt-1 text-gray-500 dark:text-gray-400'>Create an account to get started</p>
        </div>
        <div className='mt-8 p-2 shadow-sm'>
          <RegisterForm />
          <p className='mt-6 text-center text-sm text-gray-400'>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-500 hover:underline focus:underline focus:outline-none'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
