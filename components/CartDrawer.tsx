'use client';

import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  useDisclosure,
} from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ShoppingCartCheck, X } from '@/assets/icons';
import Price from '@/components/Price';
import { useGlobalContext } from '@/context/GlobalProvider';
import { createURLString } from '@/lib/utils';

export const CartDrawer: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { cart, updateCartProduct } = useGlobalContext();

  return (
    <>
      <Badge color='primary' content={cart.totalItems || 0}>
        <Button variant='ghost' onPress={onOpen} size='sm' isIconOnly>
          <ShoppingCart className='size-4' />
        </Button>
      </Badge>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} backdrop='transparent' placement='right'>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className='flex flex-col gap-1'>My Cart</DrawerHeader>
              <DrawerBody>
                {!cart || cart.lines.length === 0 ? (
                  <div className='mt-20 flex w-full flex-col items-center justify-center overflow-hidden'>
                    <ShoppingCart className='h-16' />
                    <p className='mt-6 text-center text-2xl font-bold'>Your cart is empty.</p>
                  </div>
                ) : (
                  <div className='flex h-full flex-col justify-between overflow-hidden p-1'>
                    <ul className='grow overflow-auto py-4'>
                      {cart.lines
                        .sort((a, b) => a.product.name.localeCompare(b.product.name))
                        .map((item, i) => {
                          const merchandiseUrl = createURLString(`/product/${item.product._id}`);

                          return (
                            <li
                              key={i}
                              className='flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700'>
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
                                  <Link
                                    href={merchandiseUrl}
                                    onClick={onClose}
                                    className='z-30 ml-2 flex flex-row space-x-4'>
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
                                    value={cart.lines
                                      .find((line) => line.product._id === item.product._id)
                                      ?.quantity.toString()}
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
                        <p className='text-right'>Calculated at checkout</p>
                      </div>
                      <div className='mb-3 flex items-center justify-between border-b border-neutral-200 py-1 dark:border-neutral-700'>
                        <p>Total</p>
                        <Price
                          className='text-right text-base text-black dark:text-white'
                          amount={cart.totalAmount.toString()}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </DrawerBody>
              <DrawerFooter>
                <Button
                  as={Link}
                  startContent={<ShoppingCartCheck className='size-5' />}
                  href='/checkout'
                  variant='shadow'
                  onPress={onClose}>
                  Checkout
                </Button>
                <Button color='danger' startContent={<X className='size-5' />} onPress={onClose} variant='shadow'>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
