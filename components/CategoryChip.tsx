'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useUpdateURL } from '@/hooks/useUpdateURL';
import { createUrl } from '@/lib/utils';

type CategoryChipProps = {
  categoryId?: string;
  categoryName: string;
};

export const CategoryChip: React.FC<CategoryChipProps> = ({ categoryId, categoryName }) => {
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  if (categoryId) newParams.set('category', categoryId);
  useUpdateURL();

  return (
    <Link
      href={createUrl('/', newParams)}
      className='rounded-lg border-2 bg-blue-300 p-4 shadow-lg hover:bg-slate-500 dark:border-gray-200 dark:bg-blue-600 dark:hover:bg-slate-500'>
      {categoryName}
    </Link>
  );
};
