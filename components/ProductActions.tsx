'use client';

import { Button, Input } from '@heroui/react';
import { Trash2 } from '@/assets/icons';
import { useGlobalContext } from '@/context/GlobalProvider';
import type { Product } from '@/types/general';

const ProductActions: React.FC<{ product: Product }> = ({ product }) => {
  const { cart, addCartProduct, updateCartProduct } = useGlobalContext();

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex items-center gap-x-4'>
        <h2 className='rounded-md bg-[#da1106] p-1 text-base font-semibold text-white'>
          -{product.price.discountPercentage}%
        </h2>
        <h2 className='text-xl font-semibold line-through'>${product.price.fullPrice}</h2>
        <h2 className='text-xl font-semibold'>${product.price.discountPrice}</h2>
      </div>
      {cart.lines.some((line) => line.product._id === product._id) ? (
        <div className='flex gap-x-2'>
          <Button
            variant='shadow'
            className='w-48 rounded-sm bg-orange-500 dark:bg-orange-600'
            radius='none'
            onPress={() => updateCartProduct(product, 'set')}>
            Remove from Cart
          </Button>
          <Input
            className='w-14 text-center'
            type='number'
            value={cart.lines.find((line) => line.product._id === product._id)?.quantity.toString()}
            onValueChange={(value) => updateCartProduct(product, 'set', Number(value))}
          />
        </div>
      ) : (
        <Button
          variant='shadow'
          aria-disabled={!product._id}
          disabled={!product._id}
          className='w-48 rounded-sm bg-slate-500 dark:bg-slate-600'
          onPress={() => addCartProduct(product)}>
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default ProductActions;
