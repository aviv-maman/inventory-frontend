'use client';

import type { ChipProps } from '@heroui/react';
import {
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@heroui/react';
import { useCallback } from 'react';
import { Eye, Pencil } from '@/assets/icons';

const columns = ['USER', 'ROLE', 'STATUS', 'ACTIONS'];

export const users = [
  {
    id: 1,
    name: 'Tony Reich',
    role: 'admin',
    status: 'active',
    email: 'tony.reichert@example.com',
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
          <div className='flex w-full gap-2'>
            <Tooltip content='Details' showArrow>
              <Button
                variant='flat'
                isIconOnly
                size='sm'
                className='content-center justify-items-center text-default-400 active:opacity-50'>
                <Eye className='size-5' />
              </Button>
            </Tooltip>
            <Tooltip content='Edit user' showArrow>
              <Button
                variant='flat'
                isIconOnly
                size='sm'
                className='content-center justify-items-center text-default-400 active:opacity-50'>
                <Pencil className='size-5' />
              </Button>
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
        {columns.map((col, index) => (
          <TableColumn key={`${col}-${index}`} align='start'>
            {col}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
