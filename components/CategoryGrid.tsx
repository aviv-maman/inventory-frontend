import { CategoryBreadcrumbs } from '@/components/CategoryBreadcrumbs';
import { CategoryChip } from '@/components/CategoryChip';
import { getCategories } from '@/lib/customer/requests';

interface CategoryGridProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CategoryGrid: React.FC<CategoryGridProps> = async (props) => {
  const searchParams = await props.searchParams;
  const { category: categoryId } = searchParams as { [key: string]: string | undefined };

  const { data: categories } = await getCategories({ parent: categoryId, withAncestors: true });
  const parent = categories?.find((category) => category.parent === categoryId);
  const ancestors = parent?.ancestors || [];
  const ancestorsWithHome = categoryId && categories?.length ? [{ _id: 'home', name: 'Home' }, ...ancestors] : [];

  return (
    <>
      <CategoryBreadcrumbs ancestors={ancestorsWithHome} />
      <div className='grid grid-cols-2 gap-4 rounded-lg text-center text-sm font-bold leading-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7'>
        {categories?.map((data) => <CategoryChip key={data._id} categoryName={data.name} categoryId={data._id} />)}
      </div>
    </>
  );
};

export default CategoryGrid;
