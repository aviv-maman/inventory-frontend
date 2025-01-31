'use client';

import {
  Button,
  Input,
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
import { Eye, Pencil, Plus, Search2 } from '@/assets/icons';
import { updateURLParams } from '@/lib/utils';
import type { Product } from '@/types/general';

const columns = [
  { name: 'NAME', uid: 'name' },
  // { name: 'SKU', uid: 'sku' },
  { name: 'ACTIONS', uid: 'actions' },
];

interface StoreManagementTableProps {
  products?: Product[] | null;
  totalPages: number;
  totalCount: number;
}

export const StoreManagementTable: React.FC<StoreManagementTableProps> = ({ products, totalPages, totalCount }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const changePage = (page: number) => {
    updateURLParams({ params: { page: page.toString() }, redirect: true });
  };

  const renderCell = useCallback((product: Product, columnKey: React.Key) => {
    const rawCellValue = product[columnKey as keyof Product];
    const cellValue =
      typeof rawCellValue === 'object' && 'fullPrice' in rawCellValue ? rawCellValue.fullPrice : rawCellValue;

    switch (columnKey) {
      case 'name':
        return (
          <div className='flex flex-col'>
            <p className='text-sm capitalize'>{`${product.name}`}</p>
            <p className='text-sm text-default-400'>{product.price.fullPrice}</p>
          </div>
        );
      // case 'sku':
      //   return (
      //     <div className='flex flex-col'>
      //       <p className='text-sm capitalize'>{cellValue}</p>
      //     </div>
      //   );
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
      topContent={<TopContent />}
      topContentPlacement='outside'
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
      <TableBody items={products || []}>
        {(item) => (
          <TableRow key={item._id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const TopContent: React.FC<{ totalCount?: number }> = ({ totalCount = 0 }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-end justify-between gap-3'>
        <Input
          isClearable
          className='w-full sm:max-w-[44%]'
          placeholder='Search by name...'
          startContent={<Search2 />}
        />
        <div className='flex gap-3'>
          {/* <Select>
            </Select> */}
          <Button color='primary' endContent={<Plus />}>
            Add New
          </Button>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-small text-default-400'>Total {totalCount} products</span>
        <label className='flex items-center text-small text-default-400'>
          Rows per page:
          <select className='bg-transparent text-small text-default-400 outline-none'>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
          </select>
        </label>
      </div>
    </div>
  );
};
