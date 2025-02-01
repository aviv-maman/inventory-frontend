'use server';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { verifySession } from '@/lib/auth/requests';
import { convertObjectValuesToString, createURLString } from '@/lib/utils';
import type { GetUserRes, GetUsersRes, ServerError } from '@/types/general';

export const getUser = cache(async (id: string) => {
  const session = await verifySession();
  if (!session.user)
    return {
      data: null,
      success: false,
      error: { name: 'getUser Error', message: session.error.message, statusCode: session.error.statusCode },
    } as ServerError;

  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/user/${id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${sessionValue}`,
      },
    });
    const result = await response.json();

    const errors: { [key: string]: string } = {};
    if (result?.error?.errors) {
      Object.keys(result?.error?.errors).forEach((key) => {
        errors[key] = result?.error?.errors[key].message;
      });
    }

    if (!result.success) {
      const message: string =
        result.error._message || result.error.message || 'An error occurred while fetching a user.';
      return {
        data: null,
        success: false,
        error: { name: result.error.name || 'getUser Error', message, statusCode: response.status },
      } as ServerError;
    }
    return result as GetUserRes | ServerError;
  } catch (error) {
    const err = error as Error;
    console.error('Error in getUser:', err?.message);
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
});

//role as User['role'] "customer" | "employee" | "admin"
type GetUsersArgs = { limit?: number; page?: number; name?: string; role?: string; active?: boolean };
export const getUsers = async (args?: GetUsersArgs) => {
  const searchParams = convertObjectValuesToString({ ...args, limit: args?.limit || 10, page: args?.page || 1 });
  const url = createURLString(`${process.env.SERVER_URL}/api/user`, searchParams);

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

    const result = await response.json();
    const errors: { [key: string]: string } = {};
    if (result?.error?.errors) {
      Object.keys(result?.error?.errors).forEach((key) => {
        errors[key] = result?.error?.errors[key].message;
      });
    }

    if (!result.success) {
      const message: string = result.error._message || result.error.message || 'An error occurred while getting users.';
      return {
        data: null,
        success: false,
        error: { name: result.error.name || 'getUsers Error', message, statusCode: response.status }, //result.error.message can be too long in ValidationError
      } as ServerError;
    }

    return result as GetUsersRes | ServerError;
  } catch (error) {
    const err = error as Error;
    console.error('Error in getUsers:', err?.message);
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};
