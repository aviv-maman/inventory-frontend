'use client';

import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useActionState } from 'react';
import { Plus } from '@/assets/icons';
import { addStore } from '@/lib/admin/actions';

const StoreAdditionForm: React.FC = () => {
  const [formState, formAction, isPending] = useActionState(addStore, undefined);

  const STATUSES = [
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
  ];

  return (
    <form action={formAction} className='flex w-full max-w-xs flex-col gap-4'>
      <Input
        isRequired
        errorMessage='Please enter a valid name'
        label='Name'
        labelPlacement='outside'
        name='name'
        placeholder='Enter a store name'
        type='text'
      />
      {formState?.errors?.name && <p className='text-sm text-red-500'>{formState.errors.name}</p>}
      <Input
        isRequired
        errorMessage='Please enter a valid location'
        label='Location'
        labelPlacement='outside'
        name='location'
        placeholder='Enter a store location'
        type='text'
      />
      {formState?.errors?.location && <p className='text-sm text-red-500'>{formState.errors.location}</p>}
      <Select
        isRequired
        errorMessage='Please enter a valid status'
        name='active'
        label='Status'
        placeholder='Select status'
        className='w-28'
        defaultSelectedKeys={['active']}
        labelPlacement='outside'
        disallowEmptySelection>
        {STATUSES.map((status) => (
          <SelectItem key={status.key} value={status.key}>
            {status.label}
          </SelectItem>
        ))}
      </Select>
      {formState?.errors?.active && <p className='text-sm text-red-500'>{formState.errors.active}</p>}
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

export default StoreAdditionForm;
