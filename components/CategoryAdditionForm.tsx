'use client';

import { Button, Input } from '@heroui/react';
import { useActionState } from 'react';
import { Plus } from '@/assets/icons';
import { addCategory } from '@/lib/admin/actions';

const CategoryAdditionForm: React.FC = () => {
  const [formState, formAction, isPending] = useActionState(addCategory, undefined);

  return (
    <form action={formAction} className='flex w-full max-w-xs flex-col gap-4'>
      <Input
        isRequired
        errorMessage='Please enter a valid name'
        label='Name'
        labelPlacement='outside'
        name='name'
        placeholder='Enter a category name'
        type='text'
      />
      {formState?.errors?.name && <p className='text-sm text-red-500'>{formState.errors.name}</p>}

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

export default CategoryAdditionForm;
