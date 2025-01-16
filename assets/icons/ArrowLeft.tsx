//https://lucide.dev/icons/arrow-left
import type { SVGProps } from 'react';

const ArrowLeft: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='left'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='m12 19-7-7 7-7' />
      <path d='M19 12H5' />
    </svg>
  );
};

export default ArrowLeft;
