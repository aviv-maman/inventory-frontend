'use client';

import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useActionState } from 'react';
import { Save } from '@/assets/icons';
import { editStore } from '@/lib/admin/actions';
import type { Store } from '@/types/general';

interface StoreManagementFormProps {
  store?: Store;
}

const StoreManagementForm: React.FC<StoreManagementFormProps> = ({ store }) => {
  const editStoreWithId = editStore.bind(null, store?._id || '');
  const [formState, formAction, isPending] = useActionState(editStoreWithId, undefined);

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
        defaultValue={store?.name}
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
        defaultValue={store?.location}
      />
      {formState?.errors?.location && <p className='text-sm text-red-500'>{formState.errors.location}</p>}
      <div className='flex items-end justify-between'>
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
        <Button
          color='primary'
          type='submit'
          endContent={!isPending && <Save className='size-5' />}
          aria-disabled={isPending}
          isLoading={isPending}>
          Save
        </Button>
      </div>
      {formState?.errors?.active && <p className='text-sm text-red-500'>{formState.errors.active}</p>}
      {formState?.message && <p className='text-sm text-red-500'>{formState.message}</p>}
    </form>
  );
};

export default StoreManagementForm;
