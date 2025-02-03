'use client';

import {
  Button,
  Input,
  Link,
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
import { Eye, Save, Search2 } from '@/assets/icons';
import AddProductModal from '@/components/AddProductModal';
import type { getProductsAndStockByStoreIds } from '@/lib/customer/requests';
import { updateURLParams } from '@/lib/utils';
import type { Product, Store } from '@/types/general';

const columns = [
  // { name: 'SKU', uid: 'sku' },
  { name: 'NAME', uid: 'name' },
  { name: 'PRICE', uid: 'price' },
  { name: 'ACTIONS', uid: 'actions' },
];

interface StoreManagementTableProps {
  store?: Store;
  productsAndStock?: Awaited<ReturnType<typeof getProductsAndStockByStoreIds>>['data'];
  totalPages: number;
  totalCount: number;
}

export const StoreManagementTable: React.FC<StoreManagementTableProps> = ({
  store,
  productsAndStock,
  totalPages,
  totalCount,
}) => {
  const validateStock = (value: string) => (parseInt(value) >= 0 ? true : undefined);

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const changePage = (page: number) => {
    updateURLParams({ params: { page: page.toString() }, redirect: true });
  };

  const renderCell = useCallback((item: { product: Product; stock: number }, columnKey: React.Key) => {
    const rawCellValue = item.product[columnKey as keyof Product];
    const cellValue =
      typeof rawCellValue === 'object' && 'fullPrice' in rawCellValue ? rawCellValue.fullPrice : rawCellValue;

    switch (columnKey) {
      // case 'sku':
      //   return (
      //     <div className='flex flex-col'>
      //       <p className='text-sm capitalize'>{cellValue}</p>
      //     </div>
      //   );
      case 'name':
        return (
          <div className='flex flex-col'>
            <p className='text-sm capitalize'>{`${item.product.name}`}</p>
          </div>
        );
      case 'price':
        return (
          <div className='flex flex-col'>
            <p className='text-sm'>${item.product.price.fullPrice}</p>
          </div>
        );
      case 'actions':
        return (
          <div className='flex w-full items-center gap-2'>
            <form action='' className='flex items-center gap-x-2'>
              <Input
                isRequired
                label='Stock'
                name='stock'
                type='number'
                variant='bordered'
                className='w-28'
                size='sm'
                defaultValue={item.stock.toString()}
                validate={validateStock}
              />
              <Button
                variant='flat'
                isIconOnly
                size='sm'
                className='content-center justify-items-center text-default-400 active:opacity-50'>
                <Save className='size-5' />
              </Button>
            </form>
            <Tooltip content='Details' showArrow>
              <Button
                as={Link}
                href={`/product/${item.product._id}`}
                variant='flat'
                isIconOnly
                size='sm'
                className='content-center justify-items-center text-default-400 active:opacity-50'>
                <Eye className='size-5' />
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
      topContent={<TopContent store={store} />}
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
      <TableBody items={productsAndStock || []}>
        {(item) => (
          <TableRow key={item.product._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const TopContent: React.FC<{ totalCount?: number; store?: Store }> = ({ totalCount = 0, store }) => {
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
          <AddProductModal store={store} />
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
