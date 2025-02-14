//https://lucide.dev/icons/receipt-text
import type { SVGProps } from 'react';

const ReceiptText: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='order'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z' />
      <path d='M14 8H8' />
      <path d='M16 12H8' />
      <path d='M13 16H8' />
    </svg>
  );
};

export default ReceiptText;
