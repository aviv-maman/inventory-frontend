'use client';

import { Button, Input } from '@heroui/react';
import { Trash2 } from '@/assets/icons';
import { useGlobalContext } from '@/context/GlobalProvider';
import type { Product } from '@/types/general';

interface CartButtonsProps {
  product: Product;
}

const CartButtons: React.FC<CartButtonsProps> = ({ product }) => {
  const { cart, addCartProduct, updateCartProduct } = useGlobalContext();

  return (
    <div className='flex items-center gap-x-2'>
      {cart.lines.some((line) => line.product.id === product.id) ? (
        <>
          <Button color='danger' radius='sm' size='sm' isIconOnly onPress={() => updateCartProduct(product, 'set')}>
            <Trash2 className='size-4' />
          </Button>
          <Button
            className='text-tiny font-medium'
            color='primary'
            radius='sm'
            size='sm'
            isIconOnly
            onPress={() => updateCartProduct(product, 'minus')}>
            -
          </Button>
          <Input
            className='w-14 text-center'
            type='number'
            size='sm'
            value={cart.lines.find((line) => line.product.id === product.id)?.quantity.toString()}
            onValueChange={(value) => updateCartProduct(product, 'set', Number(value))}
          />
          <Button
            className='text-tiny font-medium'
            color='primary'
            radius='sm'
            size='sm'
            isIconOnly
            onPress={() => updateCartProduct(product, 'plus')}>
            +
          </Button>
        </>
      ) : (
        <Button
          className='text-tiny font-medium'
          color='primary'
          radius='sm'
          size='sm'
          onPress={() => addCartProduct(product)}>
          Add
        </Button>
      )}
    </div>
  );
};

export default CartButtons;
