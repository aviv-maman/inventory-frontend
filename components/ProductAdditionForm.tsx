'use client';

import { Button, Input } from '@heroui/react';
import { useActionState } from 'react';
import { Plus } from '@/assets/icons';
import { addProduct } from '@/lib/employee/actions';

const ProductAdditionForm: React.FC = () => {
  const [formState, formAction, isPending] = useActionState(addProduct, undefined);

  return (
    <form action={formAction} className='flex w-full max-w-xs flex-col gap-4'>
      <Input
        isRequired
        errorMessage='Please enter a valid name'
        label='Name'
        labelPlacement='outside'
        name='name'
        placeholder='Enter a name'
        type='text'
      />
      {formState?.errors?.name && <p className='text-sm text-red-500'>{formState.errors.name}</p>}
      <Input
        isRequired
        errorMessage='Please enter a valid description'
        label='Description'
        labelPlacement='outside'
        name='description'
        placeholder='Enter a description'
        type='text'
      />
      {formState?.errors?.description && <p className='text-sm text-red-500'>{formState.errors.description}</p>}
      <Input
        isRequired
        errorMessage='Please enter a valid price'
        label='Price'
        labelPlacement='outside'
        name='fullPrice'
        placeholder='Enter a price'
        type='number'
      />
      {formState?.errors?.fullPrice && <p className='text-sm text-red-500'>{formState.errors.fullPrice}</p>}
      <Input
        isRequired
        errorMessage='Please enter a valid discount percentage'
        label='Discount Percentage'
        labelPlacement='outside'
        name='discountPercentage'
        placeholder='Enter a discount percentage'
        type='number'
      />
      {formState?.errors?.discountPercentage && (
        <p className='text-sm text-red-500'>{formState.errors.discountPercentage}</p>
      )}
      <div className='flex gap-2'>
        <Button
          color='primary'
          type='submit'
          startContent={!isPending && <Plus className='size-5' />}
          aria-disabled={isPending}
          isLoading={isPending}>
          Add
        </Button>
        {formState?.message && <p className='text-sm text-red-500'>{formState.message}</p>}
      </div>
    </form>
  );
};

export default ProductAdditionForm;
