'use client';

import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useEffect, useState } from 'react';
import StoreManagementForm from '@/components/StoreManagementForm';
import { StoreManagementTable } from '@/components/StoreManagementTable';
import { getProductsAndStockByStoreIds } from '@/lib/customer/requests';
import { artificialDelay } from '@/lib/utils';
import type { Store } from '@/types/general';

interface StoreManagementBlockProps {
  stores?: Store[] | null;
  totalPages?: number;
  totalCount?: number;
}

type ProductsAndStock = Awaited<ReturnType<typeof getProductsAndStockByStoreIds>>['data'];

const StoreManagementBlock: React.FC<StoreManagementBlockProps> = ({ stores, totalPages = 0, totalCount = 0 }) => {
  const [selectedStore, setSelectedStore] = useState<Store | undefined>(undefined);
  const [productsAndStock, setProductsAndStock] = useState<ProductsAndStock | undefined>(undefined);

  useEffect(() => {
    if (selectedStore?._id) {
      getProductsAndStockByStoreIds({ store: [selectedStore?._id] }).then((result) =>
        setProductsAndStock(() => result.data?.map((item) => item) || []),
      );
    }
  }, [selectedStore]);

  return (
    <div className='flex flex-col items-center gap-y-4'>
      <Autocomplete
        className='max-w-xs'
        defaultItems={stores || []}
        //isLoading={isLoading}
        label='Store'
        placeholder='Select a Store'
        variant='bordered'
        onSelectionChange={async (key) => {
          setSelectedStore(() => undefined);
          await artificialDelay(1); //to trigger re-render
          const store = stores?.find((store) => store._id === key?.valueOf());
          setSelectedStore(() => store);
        }}>
        {(store) => (
          <AutocompleteItem key={store._id} className='capitalize'>
            {store.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <StoreManagementForm store={selectedStore} />
      {selectedStore && (
        <StoreManagementTable
          store={selectedStore}
          productsAndStock={productsAndStock}
          totalPages={totalPages}
          totalCount={totalCount}
        />
      )}
    </div>
  );
};

export default StoreManagementBlock;
