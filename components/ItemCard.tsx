import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import Image from 'next/image';
import { PlaceholderBase64 } from '@/assets/images';
import type { Product } from '@/types/general';

const ItemCard: React.FC<{ product: Product }> = async ({ product }) => {
  return (
    <Card id='card_root-item' className='w-full border-none sm:max-w-5xl'>
      <CardHeader className='text-xl font-bold sm:text-3xl'>{product?.name}</CardHeader>
      <CardBody className='space-y-6 px-0'>
        <Image
          src={product?.images?.[0] || '/placeholder.svg'}
          alt='Main Photo'
          fill
          className='rounded-md object-cover'
          quality={100}
          placeholder={`data:image/svg+xml;base64,${PlaceholderBase64}`}
        />
        {/* <ItemCarousel images={product?.images} /> */}
        <p>{product?.description}</p>
        <div className='flex flex-wrap gap-2'>
          {product?.categories?.map((tag, index) => (
            <span key={index} className='inline-flex items-center rounded-md px-2 py-1 text-xs font-medium'>
              {tag}
            </span>
          ))}
        </div>
      </CardBody>
      <CardFooter id='item-footer' className='h-auto w-full px-0 py-4'>
        <div className='flex h-full flex-col justify-between space-y-4'>
          <span className='text-xs'>Updated at {new Date(product?.updatedAt || 0).toLocaleString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
