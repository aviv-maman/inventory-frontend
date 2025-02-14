'use client';

import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { updateURLParams } from '@/lib/utils';
import type { Order } from '@/types/general';

const columns = [
  { name: 'ORDER', uid: 'order' },
  { name: 'STATUS', uid: 'status' },
  { name: 'TOTAL PRICE', uid: 'total_price' },
  { name: 'DATE', uid: 'date' },
];

interface OrdersTableProps {
  orders?: Order[];
  totalPages: number;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders, totalPages }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const changePage = (page: number) => {
    updateURLParams({ params: { page: page.toString() }, redirect: true });
  };

  const renderCell = useCallback((order: Order, columnKey: React.Key) => {
    type OrderType = Omit<Order, 'products'>;
    const cellValue = order[columnKey as keyof OrderType];

    switch (columnKey) {
      case 'order':
        return (
          <div className='flex flex-col'>
            <Link className='text-sm' href={`/account/orders/${order._id}`}>{`${order._id}`}</Link>
          </div>
        );
      case 'status':
        return (
          <div className='flex flex-col'>
            <p className='text-sm capitalize'>{`${order.status}`}</p>
          </div>
        );
      case 'total_price':
        return (
          <div className='flex flex-col'>
            <p className='text-sm capitalize'>{`$${order.totalPrice}`}</p>
          </div>
        );
      case 'date':
        return (
          <div className='flex flex-col'>
            <p className='text-sm capitalize'>{new Date(order.createdAt || 0).toLocaleString() || 'Not Available'}</p>
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
      <TableBody items={orders || []}>
        {(item) => (
          <TableRow key={item._id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
};
