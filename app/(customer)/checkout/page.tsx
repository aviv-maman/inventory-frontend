'use server';

import { ShoppingCartCheck } from '@/assets/icons';
import CheckoutBlock from '@/components/CheckoutBlock';

export default async function CheckoutPage() {
  return (
    <section className='flex size-full flex-col items-center justify-center'>
      <div className='fixed top-6 flex min-w-96 max-w-3xl flex-col rounded-md border p-6 sm:top-10 sm:min-w-[576px]'>
        <div className='text-center'>
          <div className='mx-auto flex items-center justify-center'>
            <ShoppingCartCheck className='mr-2 size-8' />
            <h1 className='text-3xl font-bold'>Checkout</h1>
          </div>
          <p className='mt-1 text-gray-500 dark:text-gray-400'>Review your cart before paying</p>
        </div>
        <CheckoutBlock />
      </div>
    </section>
  );
}
