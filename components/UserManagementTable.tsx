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
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Eye, Pencil } from '@/assets/icons';
import { createURLString, updateURLParams } from '@/lib/utils';
import type { User } from '@/types/general';

const columns = [
  { name: 'USER', uid: 'user' },
  { name: 'ROLE', uid: 'role' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
];

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  inactive: 'danger',
};

export function UserManagementTable({ users, totalPages }: { users?: User[] | null; totalPages: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const changePage = (page: number) => {
    updateURLParams({ page: page.toString() });
  };

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case 'user':
        return (
          <div className='flex flex-col'>
            <p className='text-sm capitalize'>{`${user.firstName} ${user.lastName}`}</p>
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
          <Chip color={statusColorMap[user.active ? 'active' : 'inactive']} size='sm' variant='flat'>
            {user.active ? 'Active' : 'Inactive'}
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
            page={currentPage}
            total={totalPages}
            onChange={changePage}
          />
        </div>
      }>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align='start'>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users || []}>
        {(item) => (
          <TableRow key={item._id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
