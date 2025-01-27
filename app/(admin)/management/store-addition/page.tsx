'use server';

import { redirect } from 'next/navigation';
import StoreAdditionForm from '@/components/StoreAdditionForm';
import { verifySession } from '@/lib/auth/requests';

export default async function StoreAdditionPage() {
  const { user } = await verifySession();
  if (user?.role !== 'admin') redirect('/');

  return (
    <section className='flex size-full flex-col items-center justify-center'>
      <div className='fixed top-6 flex min-w-96 max-w-96 flex-col items-center gap-7 rounded-md border p-6 sm:max-w-[608px] md:max-w-2xl lg:max-w-7xl'>
        <h1 className='w-fit rounded border px-4 py-2 text-center text-2xl font-bold tracking-tight'>Store Addition</h1>
        <StoreAdditionForm />
      </div>
    </section>
  );
}
