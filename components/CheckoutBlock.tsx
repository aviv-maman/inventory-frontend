'use client';

import { Button } from '@heroui/react';
import { CreditCard, PayPal, Stripe } from '@/assets/icons';
import { useGlobalContext } from '@/context/GlobalProvider';

interface CheckoutBlockProps {}

const CheckoutBlock: React.FC<CheckoutBlockProps> = ({}) => {
  const { cart, handleCheckout, isLoading, updateCartProduct, error } = useGlobalContext();

  return (
    <div className='mt-4 p-2 shadow-sm'>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <p className='my-2 text-center text-sm text-gray-400'>Payment Methods</p>
      <div className='flex justify-center gap-x-2'>
        <Button
          type='button'
          variant='shadow'
          className='bg-green-600 text-gray-100'
          startContent={!isLoading && <CreditCard className='size-5' />}
          isLoading={isLoading}
          onPress={handleCheckout}>
          Credit Card
        </Button>
        <Button
          type='button'
          className='bg-blue-600 text-gray-100'
          variant='shadow'
          startContent={!isLoading && <PayPal className='size-5' />}
          isLoading={isLoading}
          onPress={handleCheckout}>
          PayPal
        </Button>
        <Button
          type='button'
          className='bg-purple-600 text-gray-100'
          variant='shadow'
          startContent={!isLoading && <Stripe className='size-5' />}
          isLoading={isLoading}
          onPress={handleCheckout}>
          Stripe
        </Button>
      </div>
      {error && <p className='mt-2 text-center text-sm text-red-500'>{error}</p>}
    </div>
  );
};

export default CheckoutBlock;
