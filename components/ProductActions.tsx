'use client';

import { Button } from '@heroui/react';
import type { Product } from '@/types/general';

const ProductActions: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex items-center gap-x-4'>
        <h2 className='rounded-md bg-[#da1106] p-1 text-base font-semibold text-white'>
          -{product.price.discountPercentage}%
        </h2>
        <h2 className='text-xl font-semibold line-through'>${product.price.fullPrice}</h2>
        <h2 className='text-xl font-semibold'>${product.price.discountPrice}</h2>
      </div>

      <Button aria-disabled={!product._id} disabled={!product._id} className='w-full rounded-sm'>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductActions;
