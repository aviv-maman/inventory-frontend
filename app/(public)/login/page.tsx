'use server';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Affiliate } from '@/assets/icons';
import { LoginForm } from '@/components/LogInForm';
import { verifySession } from '@/lib/auth/requests';

export default async function LoginPage() {
  const { user } = await verifySession();
  if (user) redirect('/');

  return (
    <main className='flex min-h-[calc(100vh-162px)] justify-center animate-in sm:min-h-[calc(100vh-154px)]'>
      <div className='m-4 flex w-full px-2 pt-16 lg:w-2/6'>
        <div className='flex-1'>
          <div className='text-center'>
            <div className='mx-auto flex items-center justify-center'>
              <Affiliate className='mr-2 size-8' />
              <h1 className='text-3xl font-bold'>InvSys</h1>
            </div>
            <p className='mt-1 text-gray-500 dark:text-gray-400'>Enter your details to access your account</p>
          </div>
          <div className='mt-8 rounded-lg border p-2 shadow-sm'>
            <LoginForm />
            <p className='mt-6 text-center text-sm text-gray-400'>
              Don&#x27;t have an account yet?{' '}
              <Link href='/register' className='text-blue-500 hover:underline focus:underline focus:outline-none'>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
