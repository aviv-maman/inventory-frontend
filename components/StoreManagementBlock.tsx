'use client';

import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useState } from 'react';
import StoreManagementForm from '@/components/StoreManagementForm';
import { StoreManagementTable } from '@/components/StoreManagementTable';
import type { Store } from '@/types/general';

interface StoreManagementBlockProps {
  stores?: Store[] | null;
  totalPages?: number;
  totalCount?: number;
}

const StoreManagementBlock: React.FC<StoreManagementBlockProps> = ({ stores, totalPages = 0, totalCount = 0 }) => {
  const [selectedStore, setSelectedStore] = useState<Store | undefined>(undefined);

  return (
    <div className='flex flex-col items-center gap-y-4'>
      <Autocomplete
        className='max-w-xs'
        defaultItems={stores || []}
        //isLoading={isLoading}
        label='Store'
        placeholder='Select a Store'
        variant='bordered'
        onSelectionChange={(key) => {
          const keyValue = key?.valueOf();
          if (typeof key === 'number') return;
          const store = stores?.find((store) => store._id === keyValue);
          setSelectedStore(() => store);
        }}>
        {(store) => (
          <AutocompleteItem key={store._id} className='capitalize'>
            {store.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
      {selectedStore && (
        <>
          <StoreManagementForm store={selectedStore} />
          <StoreManagementTable store={selectedStore} totalPages={totalPages} totalCount={totalCount} />
        </>
      )}
    </div>
  );
};

export default StoreManagementBlock;
