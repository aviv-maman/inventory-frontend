'use client';

import { Autocomplete, AutocompleteItem, Button, Input } from '@heroui/react';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useActionState, useEffect, useState } from 'react';
import { Plus } from '@/assets/icons';
import { addCategory } from '@/lib/admin/actions';
import { getCategories } from '@/lib/customer/requests';
import type { Category } from '@/types/general';

const CategoryAdditionForm: React.FC = () => {
  const [formState, formAction, isPending] = useActionState(addCategory, undefined);
  const LIMIT = 10;

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [categories, setCategories] = useState<{
    isLoading: boolean;
    page: number;
    hasMore: boolean;
    items: Category[] | undefined;
  }>({
    isLoading: false,
    page: 1,
    hasMore: true,
    items: undefined,
  });

  const loadCategories = async (page: number) => {
    try {
      setCategories((prevState) => ({ ...prevState, isLoading: true }));
      const { success, data, currentCount, totalCount, totalPages } = await getCategories({ page, limit: LIMIT });
      if (success) {
        setCategories((prevState) => ({ ...prevState, items: data, hasMore: totalPages !== categories.page }));
      }
    } catch (error) {
      const err = error as Error;
      console.error('Failed to fetch in loadCategories:', err?.message);
    } finally {
      setCategories((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  useEffect(() => {
    loadCategories(categories.page);
  }, []);

  const onLoadMore = () => {
    const newPage = categories.page + 1;
    loadCategories(newPage);
  };

  const [scrollerRef] = useInfiniteScroll({
    hasMore: categories.hasMore,
    isEnabled: categories.hasMore,
    shouldUseLoader: false,
    onLoadMore,
  });

  return (
    <form action={formAction} className='flex w-full max-w-xs flex-col gap-4'>
      <Input
        isRequired
        errorMessage='Please enter a valid name'
        label='Name'
        labelPlacement='outside'
        name='name'
        placeholder='Enter a category name'
        type='text'
      />
      {formState?.errors?.name && <p className='text-sm text-red-500'>{formState.errors.name}</p>}

      <Autocomplete
        className='max-w-xs'
        defaultItems={categories.items || []}
        isLoading={categories.isLoading}
        label='Parent'
        placeholder='Select a Parent'
        scrollRef={scrollerRef}
        variant='bordered'
        onSelectionChange={(key) => {
          const keyValue = key?.valueOf();
          if (typeof key === 'number') return;
          const category = categories.items?.find((category) => category._id === keyValue);

          setSelectedCategory(() => undefined);
          setSelectedCategory(() => category);
        }}>
        {(category) => (
          <AutocompleteItem key={category._id} className='capitalize'>
            {category.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <input name='parent' type='text' hidden readOnly value={selectedCategory?._id || ''} />
      {formState?.errors?.parent && <p className='text-sm text-red-500'>{formState.errors.parent}</p>}

      <div className='flex gap-2'>
        <Button
          color='primary'
          type='submit'
          startContent={!isPending && <Plus className='size-5' />}
          aria-disabled={isPending}
          isLoading={isPending}>
          Add
        </Button>
        {formState?.message && <p className='text-sm text-red-500'>{formState.message}</p>}
      </div>
    </form>
  );
};

export default CategoryAdditionForm;
