'use client';

import type { ChipProps } from '@nextui-org/react';
import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';
import { useCallback } from 'react';
import { Eye, Pencil } from '@/assets/icons';

export const columns = [
  { name: 'USER', uid: 'user' },
  { name: 'ROLE', uid: 'role' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
];

export const users = [
  {
    id: 1,
    name: 'Tony Reich',
    role: 'admin',
    status: 'active',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoe Lang',
    role: 'employee',
    status: 'inactive',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    name: 'Jane Fisher',
    role: 'customer',
    status: 'inactive',
    email: 'jane.fisher@example.com',
  },
  {
    id: 4,
    name: 'William Howard',
    role: 'customer',
    status: 'active',
    email: 'william.howard@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'employee',
    status: 'active',
    email: 'kristen.cooper@example.com',
  },
];

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  inactive: 'danger',
};

type User = (typeof users)[0];

export function UserManagementTable() {
  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case 'user':
        return (
          <div className='flex flex-col'>
            <p className='text-sm capitalize'>{user.name}</p>
            <p className='text-sm text-default-400'>{user.email}</p>
          </div>
        );
      case 'role':
        return (
          <div className='flex flex-col'>
            <p className='text-sm capitalize'>{cellValue}</p>
          </div>
        );
      case 'status':
        return (
          <Chip className='capitalize' color={statusColorMap[user.status]} size='sm' variant='flat'>
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Details'>
              <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                <Eye className='size-4' />
              </span>
            </Tooltip>
            <Tooltip content='Edit user'>
              <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                <Pencil className='size-4' />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label='User Management Table'
      isStriped
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='secondary'
            page={1}
            total={2}
            //onChange={(page) => setPage(page)}
          />
        </div>
      }>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
