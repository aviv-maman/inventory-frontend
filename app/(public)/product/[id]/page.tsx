import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ImageGallery from '@/components/ImageGallery';
import ItemCard from '@/components/ItemCard';
import ItemCardSkeleton from '@/components/ItemCardSkeleton';
import ProductActions from '@/components/ProductActions';
import ProductInfo from '@/components/ProductInfo';
import ProductTabs from '@/components/ProductTabs';
import { getProductById } from '@/lib/customer/requests';

export const revalidate = 60;

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { data: product } = await getProductById(params.id);

  if (!product) return notFound();

  return {
    title: `${product?.name}`,
  };
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { data: product } = await getProductById(params.id);

  if (!product) return notFound();

  return (
    <section className='flex size-full flex-col items-center justify-center'>
      <div className='flex flex-col-reverse gap-x-4 py-6 sm:fixed sm:top-[103px] sm:py-0 xl:flex-row'>
        <div className='flex flex-col gap-y-4 pt-4 xl:pt-0'>
          <ProductInfo product={product} />
          <ProductActions product={product} />
          <ProductTabs product={product} />
        </div>

        <ImageGallery images={[product?.images?.[0], product?.images?.[0], product?.images?.[0]] || []} />
        <Image
          src={product?.images?.[0]}
          priority
          width={500}
          height={500}
          alt='Product Image'
          className='size-96 rounded xl:size-[500px]'
          style={{ objectFit: 'cover' }}
        />
      </div>
    </section>
  );
}
