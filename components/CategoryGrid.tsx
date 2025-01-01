import { CategoryChip } from '@/components/CategoryChip';

interface CategoryGridProps {}

const CategoryGrid: React.FC<CategoryGridProps> = ({}) => {
  const MAIN_CATEGORIES = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Health & Beauty',
    'Toys & Kids',
    'Sports',
    'Automotive',
    'Other',
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Health & Beauty',
    'Toys & Kids',
    'Sports',
    'Automotive',
    'Other',
  ];

  return (
    <div className='grid grid-cols-2 gap-4 rounded-lg text-center text-sm font-bold leading-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7'>
      {MAIN_CATEGORIES?.map((data, index) => <CategoryChip key={`${index}-${data}`} name={data} />)}
    </div>
  );
};

export default CategoryGrid;
