'use server';

import type { GetProductsRes, ServerError } from '@/types/general';

type GetProductsArgs = { limit?: number; page?: number };
export const getProducts = async (args?: GetProductsArgs) => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/product`, {
      method: 'GET',
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
        result.error._message || result.error.message || 'An error occurred while fetching products.';
      return {
        data: null,
        success: false,
        error: { name: result.error.name || 'getProducts Error', message, statusCode: response.status },
      } as ServerError;
    }
    return result as GetProductsRes | ServerError;
  } catch (error) {
    console.error('Error in getProducts:', error);
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};
