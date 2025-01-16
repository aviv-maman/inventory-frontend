'use server';

import { UserManagementForm } from '@/components/UserManagementForm';
import { UserManagementTable } from '@/components/UserManagementTable';

export default async function UserManagementPage() {
  return (
    <section className='flex min-h-[calc(100vh-162px)] flex-col items-center gap-7 p-4 sm:min-h-[calc(100vh-154px)] sm:p-6'>
      <div className='flex max-w-7xl flex-col items-center gap-7'>
        <h1 className='w-fit rounded border px-4 py-2 text-center text-2xl font-bold tracking-tight'>
          User Management
        </h1>
        <UserManagementForm />
        <UserManagementTable />
      </div>
    </section>
  );
}
