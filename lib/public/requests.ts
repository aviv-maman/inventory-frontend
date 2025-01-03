import { artificialDelay } from '@/lib/utils';
import categories from '@/mocks/categories.json';

export const getCategories = async (parentCategoryId?: string) => {
  await artificialDelay(1000);
  return {
    results: categories.results.filter((category) => category.parent?._id === parentCategoryId),
    length: categories.results.length,
  };
};
