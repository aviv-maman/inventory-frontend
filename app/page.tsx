'use server';

import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';

export default async function HomePage() {
  return (
    <section className='mx-4 flex min-h-[calc(100vh-162px)] flex-col gap-7 animate-in sm:min-h-[calc(100vh-154px)]'>
      <div className='w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-px' />

      <div className='mx-auto flex max-w-7xl flex-col justify-center gap-8 px-6 text-foreground sm:px-0'>
        <h2 className='text-center text-lg font-bold text-slate-900 dark:text-white'>Categories</h2>
        <CategoryGrid />
      </div>

      <div className='mx-auto max-w-7xl justify-center p-4'>
        <ProductGrid />
      </div>
    </section>
  );
}
