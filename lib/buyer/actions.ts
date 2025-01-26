'use server';

import { cookies } from 'next/headers';
import type { Cart, CheckoutRes, ServerError } from '@/types/general';

export type CheckoutState = {
  errors?: { general?: string };
} | void;

type CheckoutArgs = { userId: string; cart: Cart };
export const checkout = async (args: CheckoutArgs, prevState: CheckoutState) => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/order/checkout`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionValue}`,
      },
      body: JSON.stringify({ userId: args.userId, cart: args.cart }),
    });

    const result = (await response.json()) as CheckoutRes | ServerError;
    if (!result.success) {
      return {
        message: result.error.message || 'An error occurred while checking out.',
        success: false,
      };
    }
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return { message, success: false };
  }
};
