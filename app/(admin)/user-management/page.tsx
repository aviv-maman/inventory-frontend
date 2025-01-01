'use server';

import { UserManagementForm } from '@/components/UserManagementForm';
import { UserManagementTable } from '@/components/UserManagementTable';

export default async function Page() {
  return (
    <section className='mx-4 flex min-h-[calc(100vh-162px)] flex-col gap-7 animate-in sm:min-h-[calc(100vh-154px)]'>
      <h1 className='text-center text-2xl font-bold'>User Management</h1>
      <UserManagementForm />
      <UserManagementTable />
    </section>
  );
}
