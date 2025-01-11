'use server';

import { EmployeeAdditionForm } from '@/components/EmployeeAdditionForm';

export default async function EmployeeAdditionPage() {
  return (
    <section className='mx-4 flex min-h-[calc(100vh-162px)] flex-col gap-7 animate-in sm:min-h-[calc(100vh-154px)]'>
      <h1 className='text-center text-2xl font-bold'>Employee Addition</h1>
      <EmployeeAdditionForm />
    </section>
  );
}
