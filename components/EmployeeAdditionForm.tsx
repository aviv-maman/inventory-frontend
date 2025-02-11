'use client';

import { Button, Input } from '@heroui/react';
import { Select, SelectItem } from '@heroui/react';
import { useActionState } from 'react';
import { addEmployee } from '@/lib/admin/actions';
import type { AddEmployeeFormState } from '@/lib/admin/definitions';

export const EmployeeAdditionForm: React.FC = () => {
  const initialState: AddEmployeeFormState = { message: '' };
  const [formState, formAction, isPending] = useActionState(addEmployee, initialState);

  return (
    <form action={formAction} className='flex w-full max-w-xs flex-col gap-4'>
      <Input
        isRequired
        errorMessage='Please enter a valid first name'
        label='First Name'
        labelPlacement='outside'
        name='firstName'
        placeholder='Enter a first name'
        type='text'
      />
      {formState?.errors?.firstName && <p className='text-sm text-red-500'>{formState.errors.firstName}</p>}
      <Input
        isRequired
        errorMessage='Please enter a valid last name'
        label='Last Name'
        labelPlacement='outside'
        name='lastName'
        placeholder='Enter a last name'
        type='text'
      />
      {formState?.errors?.lastName && <p className='text-sm text-red-500'>{formState.errors.lastName}</p>}
      <Input
        isRequired
        errorMessage='Please enter a valid email'
        label='Email'
        labelPlacement='outside'
        name='email'
        placeholder='Enter an email'
        type='email'
      />
      {formState?.errors?.email && <p className='text-sm text-red-500'>{formState.errors.email}</p>}
      <Input
        isRequired
        errorMessage='Please enter a valid address'
        label='Address'
        labelPlacement='outside'
        name='address'
        placeholder='Enter an address'
        type='text'
      />
      {formState?.errors?.address && <p className='text-sm text-red-500'>{formState.errors.address}</p>}
      <Input
        isRequired
        errorMessage='Please enter a valid password'
        label='Password'
        labelPlacement='outside'
        name='password'
        placeholder='Enter a password'
        type='password'
      />
      {formState?.errors?.password && <p className='text-sm text-red-500'>{formState.errors.password}</p>}
      <Input
        isRequired
        errorMessage='Please enter a valid password'
        label='Password Confirmation'
        labelPlacement='outside'
        name='passwordConfirmation'
        placeholder='Enter a password confirmation'
        type='password'
      />
      {formState?.errors?.passwordConfirmation && (
        <p className='text-sm text-red-500'>{formState.errors.passwordConfirmation}</p>
      )}
      <Select
        label='Status'
        labelPlacement='outside'
        name='active'
        placeholder='Select status'
        isRequired
        defaultSelectedKeys={['active']}
        disallowEmptySelection>
        <SelectItem key='active' value='active'>
          Active
        </SelectItem>
        <SelectItem key='inactive' value='inactive'>
          Inactive
        </SelectItem>
      </Select>
      {formState?.errors?.active && <p className='text-sm text-red-500'>{formState.errors.active}</p>}
      <div className='flex gap-2'>
        <Button color='primary' type='submit' aria-disabled={isPending} isLoading={isPending}>
          Add
        </Button>
        {formState?.message && <span className='text-sm text-red-500'>{formState.message}</span>}
      </div>
    </form>
  );
};
