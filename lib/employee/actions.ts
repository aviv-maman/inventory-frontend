'use server';

import { AddProductFormSchema } from '../employee/definitions';
import type { AddProductFormState } from '../employee/definitions';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

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
    const response = await fetch(`${process.env.SERVER_URL}/api/product/add-product`, {
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
