'use client';

import { Tab, Tabs } from '@heroui/react';
import type { Product } from '@/types/general';

const ProductTabs: React.FC<{ product: Product }> = ({ product }) => {
  const tabs = [
    {
      label: 'Product Information',
      // component: <ProductInfoTab product={product} />,
      component: <ShippingInfoTab />,
    },
    {
      label: 'Shipping & Returns',
      component: <ShippingInfoTab />,
    },
  ];

  return (
    <div className=''>
      <Tabs aria-label='Options'>
        {tabs.map((tab, i) => (
          <Tab key={i} title={tab.label} value={tab.label}>
            {tab.component}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

const ProductInfoTab2: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className='py-8 text-sm'>
      <div className='grid grid-cols-2 gap-x-8'>
        <div className='flex flex-col gap-y-4'>
          <div>
            <span className='font-semibold'>Material</span>
            <p>All our products are made from top quality materials.</p>
          </div>
          <div>
            <span className='font-semibold'>Country of origin</span>
            <p>Israel</p>
          </div>
          <div>
            <span className='font-semibold'>Type</span>
            <p>{product.categories?.[product.categories.length - 1]}</p>
          </div>
        </div>
        <div className='flex flex-col gap-y-4'>
          <div>
            <span className='font-semibold'>Weight</span>
            <p>1000g</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductInfoTab: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className='py-8 text-sm'>
      <div className='grid grid-cols-1 gap-y-8'>
        <div className='flex items-start gap-x-2'>
          <div>
            <span className='font-semibold'>Material</span>
            <p className='max-w-sm'>All our products are made from top quality materials.</p>
          </div>
        </div>
        <div className='flex items-start gap-x-2'>
          <div>
            <span className='font-semibold'>Type</span>
            <p className='max-w-sm'>{product.categories?.[product.categories.length - 1]}</p>
          </div>
        </div>
        <div className='flex items-start gap-x-2'>
          <div>
            <span className='font-semibold'>Weight</span>
            <p className='max-w-sm'>1000g</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShippingInfoTab: React.FC = () => {
  return (
    <div className='py-8 text-sm'>
      <div className='grid grid-cols-1 gap-y-8'>
        <div className='flex items-start gap-x-2'>
          <div>
            <span className='font-semibold'>Fast delivery</span>
            <p className='max-w-sm'>
              Your package will arrive in 3-5 business days at your pick up location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className='flex items-start gap-x-2'>
          {/* <Refresh /> */}
          <div>
            <span className='font-semibold'>Simple exchanges</span>
            <p className='max-w-sm'>
              Is the fit not quite right? No worries - we&apos;ll exchange your product for a new one.
            </p>
          </div>
        </div>
        <div className='flex items-start gap-x-2'>
          <div>
            <span className='font-semibold'>Easy returns</span>
            <p className='max-w-sm'>
              Just return your product and we&apos;ll refund your money. No questions asked – we&apos;ll do our best to
              make sure your return is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
