'use client';

import { Button, Input } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, PayPal, Stripe, X } from '@/assets/icons';
import Price from '@/components/Price';
import { useGlobalContext } from '@/context/GlobalProvider';
import { createURLString } from '@/lib/utils';

interface CheckoutBlockProps {}

const CheckoutBlock: React.FC<CheckoutBlockProps> = ({}) => {
  const { cart, handleCheckout, isLoading, updateCartProduct, error } = useGlobalContext();

  return (
    <div className='mt-4 p-2 shadow-sm'>
      {!cart || cart.lines.length === 0 ? (
        <div className='flex w-full flex-col items-center justify-center overflow-hidden'>
          <p className='text-center text-2xl font-bold'>Your cart is empty.</p>
        </div>
      ) : (
        <div className='flex h-full flex-col justify-between overflow-hidden p-1'>
          <ul className='grow overflow-auto py-4'>
            {cart.lines
              .sort((a, b) => a.product.name.localeCompare(b.product.name))
              .map((item, i) => {
                const merchandiseUrl = createURLString(`/product/${item.product._id}`);

                return (
                  <li key={i} className='flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700'>
                    <div className='relative flex w-full flex-row justify-between px-1 py-4'>
                      <div className='absolute z-40 -ml-1 -mt-2'>
                        <button
                          className='flex size-6 items-center justify-center rounded-full bg-slate-500'
                          onClick={() => updateCartProduct(item.product, 'set')}>
                          <X className='size-4' />
                        </button>
                      </div>
                      <div className='flex flex-row'>
                        <div className='relative size-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
                          <Image
                            className='size-full object-cover'
                            width={64}
                            height={64}
                            alt={item.product.name}
                            src={item.product.images[0]}
                          />
                        </div>
                        <Link href={merchandiseUrl} className='z-30 ml-2 flex flex-row space-x-4'>
                          <div className='flex w-52 flex-1 flex-col text-base'>
                            <span className='leading-tight'>{item.product.name}</span>
                            <p className='line-clamp-2 text-ellipsis text-sm text-neutral-500 dark:text-neutral-400'>
                              {item.product.description}
                            </p>
                          </div>
                        </Link>
                      </div>
                      <div className='flex h-16 flex-col justify-between'>
                        <Price
                          className='flex justify-end space-y-2 text-right text-sm'
                          amount={item.product.price.discountPrice.toString()}
                        />
                        <Input
                          className='w-14 text-center'
                          type='number'
                          size='sm'
                          value={cart.lines.find((line) => line.product._id === item.product._id)?.quantity.toString()}
                          onValueChange={(value) => updateCartProduct(item.product, 'set', Number(value))}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
          <div className='py-4 text-sm text-neutral-500 dark:text-neutral-400'>
            <div className='mb-3 flex items-center justify-between border-b border-neutral-200 py-1 dark:border-neutral-700'>
              <p>Shipping</p>
              <p className='text-right'>FREE</p>
            </div>
            <div className='mb-3 flex items-center justify-between border-b border-neutral-200 py-1 dark:border-neutral-700'>
              <p>Total</p>
              <Price className='text-right text-base text-black dark:text-white' amount={cart.totalAmount.toString()} />
            </div>
          </div>
        </div>
      )}
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
