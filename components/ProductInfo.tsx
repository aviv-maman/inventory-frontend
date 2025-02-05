import type { Product } from '@/types/general';

const ProductInfo: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div id='product-info'>
      <div className='mx-auto flex flex-col gap-y-4 lg:max-w-[500px]'>
        <h2 className='text-3xl leading-10' data-testid='product-title'>
          {product.name}
        </h2>
        <p className='whitespace-pre-line text-medium' data-testid='product-description'>
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
