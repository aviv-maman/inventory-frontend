'use server';

import StoreManagementBlock from '@/components/StoreManagementBlock';
import { restrictTo } from '@/lib/auth/requests';
import { getStores } from '@/lib/employee/requests';

interface PageProps {
  searchParams?: Promise<{
    page?: number;
    name?: string;
    location?: string;
    active?: boolean;
  }>;
}

export default async function StoreManagementPage({ searchParams }: PageProps) {
  const user = await restrictTo('admin', 'employee');
  const { data: stores } = await getStores();

  return (
    <section className='flex size-full flex-col items-center justify-center'>
      <div className='fixed top-6 flex min-w-96 max-w-96 flex-col items-center gap-7 rounded-md border p-6 sm:max-w-[608px] md:max-w-2xl lg:max-w-7xl'>
        <h1 className='w-fit rounded border px-4 py-2 text-center text-2xl font-bold tracking-tight'>
          Store Management
        </h1>
        <StoreManagementBlock stores={stores} />
      </div>
    </section>
  );
}
