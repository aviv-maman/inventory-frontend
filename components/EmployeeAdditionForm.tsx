'use client';

import { Button, Form, Input } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
import { useActionState } from 'react';
import { AddEmployee } from '@/lib/admin/actions';
import type { AddEmployeeFormState } from '@/lib/admin/definitions';

export const EmployeeAdditionForm: React.FC = () => {
  const initialState: AddEmployeeFormState = { message: '' };
  const [formState, formAction, isPending] = useActionState(AddEmployee, initialState);

  return (
    <Form className='flex w-full max-w-xs flex-col gap-4' validationBehavior='native'>
      <Input
        isRequired
        errorMessage='Please enter a valid name'
        label='Name'
        labelPlacement='outside'
        name='name'
        placeholder='Enter a name'
        type='text'
      />

      <Input
        isRequired
        errorMessage='Please enter a valid email'
        label='Email'
        labelPlacement='outside'
        name='email'
        placeholder='Enter an email'
        type='email'
      />

      <Input
        isRequired
        errorMessage='Please enter a valid password'
        label='Password'
        labelPlacement='outside'
        name='password'
        placeholder='Enter a password'
        type='password'
      />

      <Select
        label='Inactivity'
        labelPlacement='outside'
        name='role'
        placeholder='Select inactivity'
        isRequired
        defaultSelectedKeys={['active']}>
        <SelectItem key='active' value='active'>
          Active
        </SelectItem>
        <SelectItem key='inactive' value='inactive'>
          Inactive
        </SelectItem>
      </Select>
      <div className='flex gap-2'>
        <Button color='primary' type='submit'>
          Add
        </Button>
      </div>
    </Form>
  );
};
