'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import {
  AddCategoryFormSchema,
  AddEmployeeFormSchema,
  AddStoreFormSchema,
  EditStoreFormSchema,
} from '@/lib/admin/definitions';
import type {
  AddCategoryFormState,
  AddEmployeeFormState,
  AddStoreFormState,
  EditStoreFormState,
} from '@/lib/admin/definitions';

export const addEmployee = async (state: AddEmployeeFormState, formData: FormData): Promise<AddEmployeeFormState> => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  const rawData = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    address: formData.get('address') as string,
    password: formData.get('password') as string,
    passwordConfirmation: formData.get('passwordConfirmation') as string,
    active: formData.get('active') as string,
  };

  const validatedFields = AddEmployeeFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/user`, {
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
    const response = await fetch(`${process.env.SERVER_URL}/api/store`, {
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

export const editStore = async (
  id: string,
  state: EditStoreFormState,
  formData: FormData,
): Promise<EditStoreFormState> => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  const validatedFields = EditStoreFormSchema.safeParse({
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
    const response = await fetch(`${process.env.SERVER_URL}/api/store/${id}`, {
      method: 'PATCH',
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
        result.error._message || result.error.message || 'An error occurred while editing a store.';
      return {
        errors,
        message: errorMessage,
      };
    }
    revalidatePath('/management/store-management');
  } catch (error) {
    console.error('Error in editStore:', error);
    return { message: 'Failed to edit a store' };
  }
};

export const addCategory = async (state: AddCategoryFormState, formData: FormData): Promise<AddCategoryFormState> => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  const rawData = {
    name: formData.get('name'),
    parent: formData.get('parent'),
  };

  const validatedFields = AddCategoryFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/category`, {
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
        result.error._message || result.error.message || 'An error occurred while adding a category.';
      return {
        errors,
        message: errorMessage,
        inputs: rawData,
      };
    }
    revalidatePath('/management/category-management');
  } catch (error) {
    console.error('Error in addCategory:', error);
    return { message: 'Failed to add a category' };
  }
};
