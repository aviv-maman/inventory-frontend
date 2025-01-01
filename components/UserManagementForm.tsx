'use client';

import { Button, Form, Input, Select, SelectItem } from '@nextui-org/react';
import Link from 'next/link';

const ROLES = [
  { key: 'admin', label: 'Admin' },
  { key: 'employee', label: 'Employee' },
  { key: 'customer', label: 'Customer' },
];
const STATUSES = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
];

export function UserManagementForm() {
  return (
    <div className='flex w-full flex-col justify-between gap-3 sm:flex-row'>
      <Form className='flex w-full gap-3 sm:flex-row'>
        <Input id='name' name='name' label='Name' placeholder='Type name' className='sm:w-64' />
        <div className='flex flex-row gap-3'>
          <Select
            id='role'
            name='role'
            label='Role'
            placeholder='Select role'
            className='w-60'
            selectionMode='multiple'>
            {ROLES.map((role) => (
              <SelectItem key={role.key}>{role.label}</SelectItem>
            ))}
          </Select>
          <Select
            id='status'
            name='status'
            label='Status'
            placeholder='Select status'
            className='w-28'
            defaultSelectedKeys={['all']}>
            {STATUSES.map((status) => (
              <SelectItem key={status.key}>{status.label}</SelectItem>
            ))}
          </Select>
        </div>
        <Button type='button' className='w-full self-center sm:max-w-fit'>
          Search
        </Button>
      </Form>
      <div className='flex items-center'>
        <Link aria-label='Employee Addition' href='/employee-addition' passHref>
          <Button type='button' aria-label='Add Employee' variant='ghost'>
            Add Employee
          </Button>
        </Link>
      </div>
    </div>
  );
}
