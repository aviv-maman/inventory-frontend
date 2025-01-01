//https://tabler.io/icons/icon/shopping-cart-check
import type { SVGProps } from 'react';

const ShoppingCartCheck: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='checkout'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
      <path d='M11.5 17h-5.5v-14h-2' />
      <path d='M6 5l14 1l-1 7h-13' />
      <path d='M15 19l2 2l4 -4' />
    </svg>
  );
};

export default ShoppingCartCheck;
