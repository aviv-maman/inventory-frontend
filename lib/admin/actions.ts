'use server';

import { convertObjectValuesToString, createURLString } from '../utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { AddEmployeeFormSchema, AddStoreFormSchema } from '@/lib/admin/definitions';
import type { AddEmployeeFormState, AddStoreFormState } from '@/lib/admin/definitions';
import type { GetUsersRes, ServerError } from '@/types/general';

export const addEmployee = async (state: AddEmployeeFormState, formData: FormData): Promise<AddEmployeeFormState> => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  const validatedFields = AddEmployeeFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
    active: formData.get('active'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/user/add-employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${sessionValue}`,
      },
      body: JSON.stringify(validatedFields.data),
    });
    const result = await response.json();

    const errors: { [key: string]: string } = {};
    if (result?.error?.errors) {
      Object.keys(result?.error?.errors).forEach((key) => {
        errors[key] = result?.error?.errors[key].message;
      });
    }

    if (!result.success) {
      return {
        errors,
        message: (result.error._message as string) || 'An error occurred while adding an employee.', //result.error.message can be too long in ValidationError
      };
    }
    revalidatePath('/management/user-management');
  } catch (error) {
    console.error('Error in addEmployee:', error);
    return { message: 'Failed to add an employee' };
  }
};

//role as User['role'] "customer" | "employee" | "admin"
type getUsersArgs = { limit?: number; page?: number; name?: string; role?: string; active?: boolean };
export const getUsers = async (args?: getUsersArgs) => {
  const searchParams = convertObjectValuesToString({ ...args, limit: args?.limit || 10, page: args?.page || 1 });
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
    console.error('Failed to fetch in getUsers:', err?.message);
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};

export const addStore = async (state: AddStoreFormState, formData: FormData): Promise<AddStoreFormState> => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  const validatedFields = AddStoreFormSchema.safeParse({
    name: formData.get('name'),
    location: formData.get('location'),
    active: formData.get('active'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/store/add-store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${sessionValue}`,
      },
      body: JSON.stringify(validatedFields.data),
    });
    const result = await response.json();

    const errors: { [key: string]: string } = {};
    if (result?.error?.errors) {
      Object.keys(result?.error?.errors).forEach((key) => {
        errors[key] = result?.error?.errors[key].message;
      });
    }

    if (!result.success) {
      const errorMessage: string =
        result.error._message || result.error.message || 'An error occurred while adding a store.';
      return {
        errors,
        message: errorMessage, //result.error.message can be too long in ValidationError
      };
    }
    revalidatePath('/management/store-management');
  } catch (error) {
    console.error('Error in addStore:', error);
    return { message: 'Failed to add a store' };
  }
};
