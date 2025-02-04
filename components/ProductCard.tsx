import { Card, CardFooter, Image } from '@heroui/react';
import Link from 'next/link';
import CartButtons from '@/components/CartButtons';
import type { Product } from '@/types/general';

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  return (
    <Card isFooterBlurred>
      <Link href={`/product/${data._id}`} passHref>
        <Image
          alt={data.name || 'Product'}
          src={data.images[0]}
          isZoomed
          isBlurred
          width={384}
          height={256}
          radius='none'
        />
      </Link>
      <CardFooter className='block border-t-1 border-zinc-100/50 bg-white/30'>
        <Link href={`/product/${data._id}`} passHref>
          <h4 className='pb-2 text-xl font-medium text-black'>{data.name}</h4>
        </Link>
        <div className='flex flex-row justify-between gap-x-4'>
          <div className='flex items-center gap-x-4'>
            <p className='rounded-md bg-[#da1106] p-1 text-base font-semibold text-white'>
              -{data.price.discountPercentage}%
            </p>
            <p className='text-small font-medium text-black line-through'>${data.price.fullPrice}</p>
            <p className='text-small font-medium text-black'>${data.price.discountPrice}</p>
          </div>
          <CartButtons product={data} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
