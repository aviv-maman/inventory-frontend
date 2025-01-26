'use server';

import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/general';

interface ProductGridProps {
  products?: Product[] | null;
}

const ProductGrid: React.FC<ProductGridProps> = async ({ products }) => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {products?.map((product, index) => <ProductCard key={`${index}-${product?.id}`} data={product} />)}
    </div>
  );
};

export default ProductGrid;
