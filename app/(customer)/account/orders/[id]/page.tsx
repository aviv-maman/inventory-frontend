import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getOrderById } from '@/lib/customer/requests';

export const revalidate = 60;

type MetadataProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MetadataProps, parent: ResolvingMetadata): Promise<Metadata> {
  const id = (await params).id;
  const { data: order } = await getOrderById(id);

  return {
    title: `Order ${order?._id}`,
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: PageProps) {
  const id = (await params).id;
  const { data: order } = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <section className='container relative flex min-h-[calc(100vh-146px)] flex-col items-center justify-between gap-y-6 sm:min-h-[calc(100vh-138px)] sm:px-8'>
      <Suspense fallback={'<ItemCardSkeleton />'}>{/* <ItemCard id={id} /> */}</Suspense>
    </section>
  );
}
