'use client';

import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useState } from 'react';
import StoreManagementForm from '@/components/StoreManagementForm';
import type { Store } from '@/types/general';

interface StoreManagementBlockProps {
  stores?: Store[] | null;
  totalPages?: number;
}

const StoreManagementBlock: React.FC<StoreManagementBlockProps> = ({ stores, totalPages }) => {
  const [selectedStore, setSelectedStore] = useState<Store | undefined>(undefined);

  return (
    <div>
      <Autocomplete
        className='mb-4 max-w-xs'
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
      {selectedStore && <StoreManagementForm store={selectedStore} />}
    </div>
  );
};

export default StoreManagementBlock;
