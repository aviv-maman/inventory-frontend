'use client';

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { Plus } from '@/assets/icons';
import { getProducts } from '@/lib/customer/requests';
import { updateStockInStore } from '@/lib/employee/actions';
import type { Product, Store } from '@/types/general';

const AddProductModal: React.FC<{ store?: Store }> = ({ store }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const LIMIT = 10;
  const [products, setProducts] = useState<{
    isLoading: boolean;
    page: number;
    hasMore: boolean;
    items: Product[] | undefined;
  }>({
    isLoading: false,
    page: 1,
    hasMore: true,
    items: undefined,
  });

  const updateStockInStoreWithId = updateStockInStore.bind(null, store?._id || '');
  const [formState, formAction, isPending] = useActionState(updateStockInStoreWithId, undefined);

  const validateStock = (value: string) => (parseInt(value) >= 0 ? true : undefined);

  const isInvalid = useMemo(() => {
    if (selectedProduct?.stock === undefined) return;

    return validateStock(selectedProduct.stock.toString()) ? false : true;
  }, [selectedProduct]);

  const loadProducts = async (page: number) => {
    try {
      setProducts((prevState) => ({ ...prevState, isLoading: true }));
      if (store?._id) {
        const { success, data, currentCount, totalCount, totalPages } = await getProducts({ page, limit: LIMIT });
        if (success) {
          setProducts((prevState) => ({ ...prevState, items: data, hasMore: totalPages !== products.page }));
        }
      }
    } catch (error) {
      const err = error as Error;
      console.error('Failed to fetch in getStores:', err?.message);
    } finally {
      setProducts((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  useEffect(() => {
    loadProducts(products.page);
  }, []);

  const onLoadMore = () => {
    const newPage = products.page + 1;
    loadProducts(newPage);
  };

  const [scrollerRef] = useInfiniteScroll({
    hasMore: products.hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore,
  });

  return (
    <>
      <Button color='primary' endContent={<Plus />} onPress={onOpen}>
        Add New
      </Button>
      <Modal
        isOpen={isOpen}
        placement='top-center'
        onOpenChange={onOpenChange}
        isKeyboardDismissDisabled={isPending}
        isDismissable={!isPending}
        hideCloseButton={isPending}>
        <ModalContent>
          {(onClose) => (
            <form
              action={(formData) => {
                formAction(formData);
                if (!formState?.errors || !formState?.message) onClose();
              }}>
              <ModalHeader className='flex flex-col gap-1'>Add a Product to a Store</ModalHeader>
              <ModalBody className='items-center'>
                <Autocomplete
                  isRequired
                  className='max-w-xs'
                  defaultItems={products.items || []}
                  isLoading={products.isLoading}
                  label='Product'
                  placeholder='Select a Product'
                  scrollRef={scrollerRef}
                  variant='bordered'
                  onSelectionChange={(key) => {
                    const keyValue = key?.valueOf();
                    if (typeof key === 'number') return;
                    const product = products.items?.find((product) => product._id === keyValue);
                    setSelectedProduct(() => undefined);
                    setSelectedProduct(() => product);
                  }}>
                  {(product) => (
                    <AutocompleteItem key={product._id} className='capitalize'>
                      {product.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <input name='product' type='text' hidden readOnly value={selectedProduct?._id || ''} />
                {formState?.errors?.id && <p className='text-sm text-red-500'>{formState.errors.id}</p>}
                <Input
                  isRequired
                  label='Stock'
                  placeholder='Enter stock'
                  name='stock'
                  type='number'
                  variant='bordered'
                  className='max-w-xs'
                  value={selectedProduct?.stock.toString()}
                  onValueChange={(v) => {
                    setSelectedProduct((prevState) => prevState && { ...prevState, stock: parseInt(v) });
                  }}
                  validate={validateStock}
                  isInvalid={isInvalid}
                />
                {formState?.errors?.stock && <p className='text-sm text-red-500'>{formState.errors.stock}</p>}
                {formState?.message && <p className='text-sm text-red-500'>{formState.message}</p>}
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='flat'
                  onPress={onClose}
                  aria-disabled={isPending}
                  isDisabled={isPending}>
                  Close
                </Button>
                <Button
                  type='submit'
                  startContent={!isPending && <Plus className='size-5' />}
                  color='primary'
                  aria-disabled={isPending}
                  isLoading={isPending}>
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProductModal;
