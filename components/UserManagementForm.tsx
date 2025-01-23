import { Button, Form, Input, Select, SelectItem } from '@heroui/react';
import Link from 'next/link';
import { Search2 } from '@/assets/icons';

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

interface UserManagementFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading?: boolean;
}

export const UserManagementForm: React.FC<UserManagementFormProps> = ({ onSubmit, isLoading }) => {
  return (
    <div className='flex w-full flex-col flex-wrap-reverse justify-between gap-6 sm:flex-row'>
      <Form className='flex w-full gap-3 sm:flex-row' method='get' onSubmit={onSubmit}>
        <Input
          id='name'
          name='name'
          label='Name'
          placeholder='Type name'
          className='sm:w-64'
          labelPlacement='outside'
        />
        <div className='flex w-full flex-row gap-3'>
          <Select
            id='role'
            name='role'
            label='Role'
            placeholder='Select role(s)'
            className='w-60'
            selectionMode='multiple'
            labelPlacement='outside'>
            {ROLES.map((role) => (
              <SelectItem key={role.key} value={role.key}>
                {role.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            id='active'
            name='active'
            label='Status'
            placeholder='Select status'
            className='w-28'
            defaultSelectedKeys={['all']}
            labelPlacement='outside'
            disallowEmptySelection>
            {STATUSES.map((status) => (
              <SelectItem key={status.key} value={status.key}>
                {status.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Button
          type='submit'
          startContent={!isLoading && <Search2 className='size-5' />}
          className='w-full self-end sm:max-w-fit'
          aria-disabled={isLoading}
          isLoading={isLoading}>
          Search
        </Button>
      </Form>
      <div className='flex items-center'>
        <Link aria-label='Employee Addition' href='/management/employee-addition' passHref>
          <Button type='button' aria-label='Add Employee' variant='ghost'>
            Add Employee
          </Button>
        </Link>
      </div>
    </div>
  );
};
