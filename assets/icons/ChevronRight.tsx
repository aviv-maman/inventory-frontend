//https://lucide.dev/icons/chevron-right
import type { SVGProps } from 'react';

const ChevronRight: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='right'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='m9 18 6-6-6-6' />
    </svg>
  );
};

export default ChevronRight;
