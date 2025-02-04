import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getProductById } from '@/lib/customer/requests';

// import ItemCardSkeleton from '@/components/ItemCardSkeleton';
// import ItemCard from '@/components/ItemCard';

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
    <section className='container relative flex min-h-[calc(100vh-146px)] flex-col items-center justify-between gap-y-6 sm:min-h-[calc(100vh-138px)] sm:px-8'>
      {/* <Suspense fallback={<ItemCardSkeleton />}>
        <ItemCard id={params.id} />
      </Suspense> */}
    </section>
  );
}
