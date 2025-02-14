'use server';

import { cookies } from 'next/headers';
import { convertObjectValuesToString, createURLString } from '@/lib/utils';
import type {
  GetCategoriesRes,
  GetCategoriesWithAncestorsRes,
  GetOrderRes,
  GetOrdersRes,
  GetProductRes,
  GetProductsByStoresIdsRes,
  GetProductsRes,
  ServerError,
} from '@/types/general';

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

type GetProductsByStoresArgs = { limit?: number; page?: number; store?: string[]; excludedStores?: string[] };
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

export const getProductById = async (id: string) => {
  const url = createURLString(`${process.env.SERVER_URL}/api/product/${id}`);

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
        result.error._message || result.error.message || 'An error occurred while fetching a product.';
      return {
        data: null,
        success: false,
        error: { name: result.error.name || 'getProductById Error', message, statusCode: response.status },
      } as ServerError;
    }
    return result as GetProductRes | ServerError;
  } catch (error) {
    console.error('Error in getProductById:', error);
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};

type GetCategoriesArgs = { limit?: number; page?: number; parent?: string };
export const getCategories = async (args?: GetCategoriesArgs) => {
  const searchParams = convertObjectValuesToString({
    parent: args?.parent,
    limit: args?.limit || 10,
    page: args?.page || 1,
  });
  const url = createURLString(`${process.env.SERVER_URL}/api/category`, searchParams);

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
        result.error._message || result.error.message || 'An error occurred while fetching categories.';
      return {
        data: null,
        success: false,
        error: { name: result.error.name || 'getCategories Error', message, statusCode: response.status },
      } as ServerError;
    }

    return result as GetCategoriesRes | ServerError;
  } catch (error) {
    console.error('Error in getCategories:', error);
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};

type GetCategoriesWithAncestorsArgs = { limit?: number; page?: number; categoryId?: string };
export const getCategoriesWithAncestors = async (args?: GetCategoriesWithAncestorsArgs) => {
  const searchParams = convertObjectValuesToString({
    categoryId: args?.categoryId,
    limit: args?.limit || 10,
    page: args?.page || 1,
  });
  const url = createURLString(`${process.env.SERVER_URL}/api/category/with-ancestors`, searchParams);

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
        result.error._message || result.error.message || 'An error occurred while fetching categories.';
      return {
        data: null,
        success: false,
        error: { name: result.error.name || 'getCategoriesWithAncestors Error', message, statusCode: response.status },
      } as ServerError;
    }

    return result as GetCategoriesWithAncestorsRes | ServerError;
  } catch (error) {
    console.error('Error in getCategoriesWithAncestors:', error);
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};

export const getOrderById = async (id: string) => {
  const url = createURLString(`${process.env.SERVER_URL}/api/order/${id}`);

  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
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
        result.error._message || result.error.message || 'An error occurred while fetching an order.';
      return {
        data: null,
        success: false,
        error: { name: result.error.name || 'getOrderById Error', message, statusCode: response.status },
      } as ServerError;
    }
    return result as GetOrderRes | ServerError;
  } catch (error) {
    console.error('Error in getOrderById:', error);
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};

type GetOrdersArgs = { limit?: number; page?: number; userId?: string };
export const getOrders = async (args?: GetOrdersArgs) => {
  const searchParams = convertObjectValuesToString({ ...args, limit: args?.limit || 10, page: args?.page || 1 });
  const url = createURLString(`${process.env.SERVER_URL}/api/order`, searchParams);

  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
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
        result.error._message || result.error.message || 'An error occurred while fetching orders.';
      return {
        data: null,
        success: false,
        error: { name: result.error.name || 'getOrders Error', message, statusCode: response.status },
      } as ServerError;
    }
    return result as GetOrdersRes | ServerError;
  } catch (error) {
    console.error('Error in getOrders:', error);
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};
