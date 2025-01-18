'use server';

import { cookies } from 'next/headers';
import type { AddEmployeeFormState } from '@/lib/admin/definitions';
import type { GetUsersRes, ServerError } from '@/types/general';

export const addEmployee = async (state: AddEmployeeFormState, formData: FormData) => {
  try {
    const response = await fetch('/api/employee/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to add employee');
    return { message: 'Failed to add employee' };
  }
};

export const getUsers = async () => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/user/get-all`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${sessionValue}`,
      },
      cache: 'no-cache',
    });
    return (await response.json()) as GetUsersRes | ServerError;
  } catch (error) {
    console.error('Failed to fetch in getUsers');
    const err = error as Error;
    return { statusCode: 500, name: err?.name, message: err?.message, data: null, success: false };
  }
};
