'use server';

import { convertObjectValuesToString, createURLString } from '@/lib/utils';
import type { GetProductsByStoresIdsRes, GetProductsRes, ServerError } from '@/types/general';

type GetProductsArgs = { limit?: number; page?: number };
export const getProducts = async (args?: GetProductsArgs) => {
  const searchParams = convertObjectValuesToString({ ...args, limit: args?.limit || 10, page: args?.page || 1 });
  const url = createURLString(`${process.env.SERVER_URL}/api/product`, searchParams);

  try {
    const response = await fetch(url, {
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

type GetProductsByStoresArgs = { limit?: number; page?: number; store?: string[] };
export const getProductsAndStockByStoreIds = async (args?: GetProductsByStoresArgs) => {
  const searchParams = convertObjectValuesToString({ ...args, limit: args?.limit || 10, page: args?.page || 1 });
  const url = createURLString(`${process.env.SERVER_URL}/api/store/products`, searchParams);

  try {
    const response = await fetch(url, {
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
    return result as GetProductsByStoresIdsRes | ServerError;
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
