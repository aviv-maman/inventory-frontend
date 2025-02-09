'use server';

import { cookies } from 'next/headers';
import type { Cart, CheckoutRes, ServerError } from '@/types/general';

export type CheckoutState = {
  errors?: { general?: string };
} | void;

export const checkout = async (cart: Cart) => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  const preparedCart = {
    products: cart.lines.map((line) => ({
      _id: line.product._id,
      quantity: line.quantity,
      price: line.product.price.discountPrice,
    })),
    totalPrice: cart.totalAmount,
  };

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/order/checkout`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionValue}`,
      },
      body: JSON.stringify({ cart: preparedCart }),
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
    console.error('Error in checkout:', err?.message);
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};
