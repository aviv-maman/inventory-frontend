import { artificialDelay } from '@/lib/utils';
import type { Cart } from '@/types/general';

export type CheckoutState = {
  errors?: { general?: string };
} | void;

export const checkout = async (cart: Cart, prevState: CheckoutState) => {
  await artificialDelay(2000);
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
