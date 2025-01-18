'use server';

import { convertObjectValuesToString, createURLString } from '../utils';
import { cookies } from 'next/headers';
import type { AddEmployeeFormState } from '@/lib/admin/definitions';
import type { GetUsersRes, ServerError, User } from '@/types/general';

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

type getUsersArgs = { limit?: number; page?: number; query?: string; role?: User['role']; active?: boolean };
export const getUsers = async (args?: getUsersArgs) => {
  const searchParams = convertObjectValuesToString({ limit: 10, page: 1, ...args });
  const url = createURLString(`${process.env.SERVER_URL}/api/user/get-all`, searchParams);

  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${sessionValue}`,
      },
      cache: 'no-cache',
    });
    return (await response.json()) as GetUsersRes | ServerError;
  } catch (error) {
    const err = error as Error;
    console.error('Failed to fetch in getUsers:', err?.message);
    return { statusCode: 500, name: err?.name, message: err?.message, data: null, success: false } as ServerError;
  }
};
