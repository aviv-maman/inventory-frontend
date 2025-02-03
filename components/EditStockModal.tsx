'use client';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@heroui/react';
import { useActionState } from 'react';
import { Layers } from '@/assets/icons';
import { updateStockInStore } from '@/lib/employee/actions';
import type { Product, Store } from '@/types/general';

const EditStockModal: React.FC<{ store?: Store; product?: Product; stock?: number }> = ({ store, product, stock }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updateStockInStoreWithId = updateStockInStore.bind(null, store?._id || '');
  const [formState, formAction, isPending] = useActionState(updateStockInStoreWithId, undefined);

  const validateStock = (value: string) => (parseInt(value) >= 0 ? true : undefined);

  return (
    <>
      <Tooltip content='Update Stock' showArrow>
        <Button color='primary' isIconOnly size='sm' endContent={<Layers className='size-5' />} onPress={onOpen} />
      </Tooltip>
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
              <ModalHeader className='flex flex-col gap-1'>Update Stock of a Product</ModalHeader>
              <ModalBody className='items-center'>
                <input name='product' type='text' hidden readOnly value={product?._id || ''} />
                {formState?.errors?.id && <p className='text-sm text-red-500'>{formState.errors.id}</p>}
                <Input
                  isRequired
                  label='Stock'
                  placeholder='Enter stock'
                  name='stock'
                  type='number'
                  variant='bordered'
                  className='max-w-xs'
                  validate={validateStock}
                  defaultValue={stock?.toString()}
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
                  startContent={!isPending && <Layers className='size-5' />}
                  color='primary'
                  aria-disabled={isPending}
                  isLoading={isPending}>
                  Update
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditStockModal;
