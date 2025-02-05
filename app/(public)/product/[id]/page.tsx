import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

  return <section className='flex size-full flex-col items-center justify-center'>ProductPage</section>;
}
