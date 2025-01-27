'use client';

import { Button, Input } from '@heroui/react';
import { useActionState } from 'react';

const StoreAdditionForm: React.FC = () => {
  //   const [formState, formAction, isPending] = useActionState(addStore, undefined);

  return (
    <form className='flex w-full max-w-xs flex-col gap-4'>
      <Input
        isRequired
        errorMessage='Please enter a valid name'
        label='Name'
        labelPlacement='outside'
        name='name'
        placeholder='Enter a store name'
        type='text'
      />
      <Input
        isRequired
        errorMessage='Please enter a valid name'
        label='Location'
        labelPlacement='outside'
        name='name'
        placeholder='Enter a store location'
        type='text'
      />
      <div className='flex gap-2'>
        <Button color='primary' type='submit'>
          Add
        </Button>
        {/* {formState?.message && <p className='text-sm text-red-500'>{formState.message}</p>} */}
      </div>
    </form>
  );
};

export default StoreAdditionForm;
