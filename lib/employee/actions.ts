'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { AddProductFormSchema, UpdateStockFormSchema } from '@/lib/employee/definitions';
import type { AddProductFormState, UpdateStockFormState } from '@/lib/employee/definitions';

export const addProduct = async (state: AddProductFormState, formData: FormData): Promise<AddProductFormState> => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  const validatedFields = AddProductFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    fullPrice: Number(formData.get('fullPrice')),
    discountPercentage: Number(formData.get('discountPercentage')),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/product`, {
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
        result.error._message || result.error.message || 'An error occurred while adding a product.';
      return {
        errors,
        message: errorMessage, //result.error.message can be too long in ValidationError
      };
    }
    revalidatePath('/', 'layout');
  } catch (error) {
    console.error('Error in addProduct:', error);
    return { message: 'Failed to add a product' };
  }
};

export const updateStockInStore = async (
  storeId: string,
  state: UpdateStockFormState,
  formData: FormData,
): Promise<UpdateStockFormState> => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  const rawData = {
    id: formData.get('product'),
    stock: formData.get('stock'),
  };

  const validatedFields = UpdateStockFormSchema.safeParse({ ...rawData, stock: Number(rawData.stock) });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/store/${storeId}/stock`, {
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
        result.error._message || result.error.message || 'An error occurred while updating a stock.';
      return {
        errors,
        message: errorMessage,
        inputs: rawData,
      };
    }
    revalidatePath('/management/store-management');
    return { inputs: rawData };
  } catch (error) {
    console.error('Error in updateStockInStore:', error);
    return { message: 'Failed to update a stock' };
  }
};
