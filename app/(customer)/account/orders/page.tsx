import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth/requests';

export const metadata: Metadata = {
  title: 'Account',
};

export default async function AccountPage() {
  const { user } = await verifySession();
  if (!user) redirect('/');

  return (
    <div className='flex w-full flex-col self-center sm:container sm:max-w-3xl'>
      <main className='flex flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center'>
          <h1 className='text-lg font-semibold md:text-2xl'>Orders</h1>
        </div>
        {/* <UserAccountCard /> */}
        <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
          <div className='flex flex-col items-center gap-1 p-4 text-center'>
            <h3 className='text-2xl font-bold tracking-tight'>Your Latest Orders</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
