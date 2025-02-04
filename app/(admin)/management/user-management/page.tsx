'use server';

import { redirect } from 'next/navigation';
import UserManagementBlock from '@/components/UserManagementBlock';
import { getUsers } from '@/lib/admin/requests';
import { verifySession } from '@/lib/auth/requests';
import type { User } from '@/types/general';

interface PageProps {
  searchParams?: Promise<{
    page?: number;
    name?: string;
    role?: User['role'];
    active?: boolean;
  }>;
}

export default async function UserManagementPage({ searchParams }: PageProps) {
  const paramsRes = (await searchParams) || {};

  const { user } = await verifySession();
  if (user?.role !== 'admin') redirect('/');

  const result = await getUsers({ limit: 10, ...paramsRes, page: paramsRes.page || 1 });

  return (
    <section className='flex size-full flex-col items-center justify-center'>
      <div className='fixed top-6 flex min-w-96 max-w-96 flex-col items-center gap-7 rounded-md border p-6 sm:max-w-[608px] md:max-w-2xl lg:max-w-7xl'>
        <h1 className='w-fit rounded border px-4 py-2 text-center text-2xl font-bold tracking-tight'>
          User Management
        </h1>
        <UserManagementBlock users={result.data} totalPages={result.totalPages} />
      </div>
    </section>
  );
}
