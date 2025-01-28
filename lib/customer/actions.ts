'use server';

import { cookies } from 'next/headers';
import type { Cart, CheckoutRes, GetProductsRes, ServerError } from '@/types/general';

export type CheckoutState = {
  errors?: { general?: string };
} | void;

type CheckoutArgs = { userId: string; cart: Cart };
export const checkout = async (args: CheckoutArgs, prevState: CheckoutState) => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  const preparedCart = {
    products: args.cart.lines.map((line) => ({ productId: line.product._id, quantity: line.quantity })),
    totalAmount: args.cart.totalAmount,
  };

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/order/checkout`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionValue}`,
      },
      body: JSON.stringify({ userId: args.userId, cart: preparedCart }),
    });

    const result = await response.json();
    const errors: { [key: string]: string } = {};
    if (result?.error?.errors) {
      Object.keys(result?.error?.errors).forEach((key) => {
        errors[key] = result?.error?.errors[key].message;
      });
    }

    if (!result.success) {
      const message: string = result.error._message || result.error.message || 'An error occurred while checking out.';
      return {
        data: null,
        success: false,
        error: { name: result.error.name || 'checkout Error', message, statusCode: response.status },
      } as ServerError;
    }
    return result as CheckoutRes | ServerError;
  } catch (error) {
    const err = error as Error;
    console.error('Failed to checkout in checkout:', err?.message);
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/product/get-all`, {
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
        error: { name: result.error.name || 'fetchProducts Error', message, statusCode: response.status },
      } as ServerError;
    }
    return result as GetProductsRes | ServerError;
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};
