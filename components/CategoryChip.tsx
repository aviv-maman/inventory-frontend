import Link from 'next/link';

type CategoryChipProps = {
  name: string;
};

export const CategoryChip: React.FC<CategoryChipProps> = ({ name }) => {
  return (
    <Link
      href={`search?category=${name}`}
      className='rounded-lg border-2 bg-blue-300 p-4 shadow-lg hover:bg-slate-500 dark:border-gray-200 dark:bg-blue-600 dark:hover:bg-slate-500'>
      {name}
    </Link>
  );
};
