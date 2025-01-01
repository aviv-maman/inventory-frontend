'use server';

import ProductCard from '@/components/ProductCard';
import { artificialDelay } from '@/lib/utils';
import mockProductsRes from '@/mocks/products.json';

const fetchProducts = async () => {
  await artificialDelay();
  return mockProductsRes;
};

interface ProductGridProps {}

const ProductGrid: React.FC<ProductGridProps> = async ({}) => {
  const { results } = await fetchProducts();

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {results?.map((product, index) => <ProductCard key={`${index}-${product?.id}`} data={product} />)}
    </div>
  );
};

export default ProductGrid;
